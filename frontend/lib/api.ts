const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Task {
  id: number;
  task_text: string;
  order: number;
}

export interface Goal {
  id: number;
  goal_text: string;
  complexity_score: number;
  created_at: string;
  tasks: Task[];
}

export async function createGoal(goalText: string): Promise<Goal> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_text: goalText }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create goal';
      try {
        const error = await response.json();
        errorMessage = error.detail || errorMessage;
      } catch {
        errorMessage = `Server returned ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Make sure the backend is running.`);
    }
    throw error;
  }
}

export async function getGoals(): Promise<Goal[]> {
  const response = await fetch(`${API_BASE_URL}/api/goals`);

  if (!response.ok) {
    throw new Error('Failed to fetch goals');
  }

  return response.json();
}

export async function getGoalById(goalId: number): Promise<Goal> {
  const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch goal');
  }

  return response.json();
}

