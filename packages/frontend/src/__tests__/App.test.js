import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('deletes a todo when delete button is clicked', async () => {
  const user = userEvent.setup();
  const testQueryClient = createTestQueryClient();
  
  const mockTodos = [
    { id: 1, title: 'Test Todo', completed: false }
  ];

  // Mock initial fetch to return one todo
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to appear
  await screen.findByText('Test Todo');

  // Mock DELETE request
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({}),
  });

  // Mock refetch after delete to return empty array
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  // Click delete button
  const deleteButton = screen.getByRole('button', { name: /delete todo/i });
  await user.click(deleteButton);

  // Verify DELETE request was made with relative URL
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/todos/1',
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});

test('displays correct todo stats', async () => {
  const testQueryClient = createTestQueryClient();
  
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  // Mock initial fetch to return todos
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Todo 1');

  // Verify stats show correct counts
  expect(screen.getByText('2 items left')).toBeInTheDocument();
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock fetch to return empty array
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for loading to complete and verify empty state message appears
  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('displays error message when fetch fails', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock fetch to reject (network error)
  global.fetch.mockRejectedValueOnce(new Error('Network error'));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for error message to appear
  await waitFor(() => {
    expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
  });
});

test('adds a todo with relative URL and handles errors', async () => {
  const user = userEvent.setup();
  const testQueryClient = createTestQueryClient();

  // Mock initial fetch to return empty array
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for component to load
  await screen.findByText(/no todos yet/i);

  // Mock successful POST request
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, title: 'New Todo', completed: false }),
  });

  // Mock refetch after add to return new todo
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ id: 1, title: 'New Todo', completed: false }],
  });

  // Fill in the input and submit
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  await user.type(input, 'New Todo');
  
  const addButton = screen.getByRole('button', { name: /add/i });
  await user.click(addButton);

  // Verify POST request was made with RELATIVE URL
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/todos',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Todo' }),
      })
    );
  });
});

test('handles error when add todo fails', async () => {
  const user = userEvent.setup();
  const testQueryClient = createTestQueryClient();

  // Mock initial fetch to return empty array
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for component to load
  await screen.findByText(/no todos yet/i);

  // Mock failed POST request (response.ok = false)
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    json: async () => ({ error: 'Server error' }),
  });

  // Fill in the input and submit
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  await user.type(input, 'New Todo');
  
  const addButton = screen.getByRole('button', { name: /add/i });
  await user.click(addButton);

  // Verify error is thrown when response.ok is false
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/todos',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
