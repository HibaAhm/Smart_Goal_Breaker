'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createGoal, getGoals, type Goal } from '@/lib/api';
import { Loader2, Target, CheckCircle2, Sparkles, TrendingUp, Calendar, RefreshCw, Zap, ListChecks } from 'lucide-react';

export default function Home() {
  const [goalText, setGoalText] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allGoals, setAllGoals] = useState<Goal[]>([]);
  const [loadingGoals, setLoadingGoals] = useState(false);
  const [showAllGoals, setShowAllGoals] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentGoal(null);

    try {
      const newGoal = await createGoal(goalText);
      setCurrentGoal(newGoal);
      setSelectedGoal(null); // Clear selected goal when creating new one
      setGoalText('');
      // Refresh the goals list
      const goals = await getGoals();
      const sortedGoals = goals.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setAllGoals(sortedGoals);
      setShowAllGoals(true); // Auto-show all goals after creating
    } catch (err) {
      console.error('Error creating goal:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('Failed to create goal. Make sure the backend is running on http://localhost:8000');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAllGoals = async () => {
    setLoadingGoals(true);
    try {
      const goals = await getGoals();
      // Sort by most recent first
      const sortedGoals = goals.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setAllGoals(sortedGoals);
      setShowAllGoals(true);
      // Select the most recent goal by default
      if (sortedGoals.length > 0 && !selectedGoal) {
        setSelectedGoal(sortedGoals[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load goals');
    } finally {
      setLoadingGoals(false);
    }
  };

  useEffect(() => {
    // Load goals on mount
    const fetchGoals = async () => {
      setLoadingGoals(true);
      try {
        const goals = await getGoals();
        setAllGoals(goals);
        setShowAllGoals(true);
      } catch (err) {
        // Silently fail on mount
      } finally {
        setLoadingGoals(false);
      }
    };
    fetchGoals();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8 pb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <Target className="w-12 h-12 text-indigo-600 animate-pulse" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Goal Breaker
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ambitious dreams into <span className="font-semibold text-indigo-600">actionable, step-by-step plans</span> powered by AI
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-2 border-indigo-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg border-b">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              Enter Your Goal
            </CardTitle>
            <CardDescription className="text-base">
              Type any goal and watch AI transform it into 5 actionable steps
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="goal" className="text-base font-semibold text-gray-700">
                  What do you want to achieve?
                </Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Launch a startup, Learn a new language, Build a mobile app..."
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  disabled={loading}
                  rows={4}
                  className="resize-none text-base border-2 focus:border-indigo-500 transition-colors"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !goalText.trim()} 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AI is breaking down your goal...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Break Down Goal
                  </>
                )}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Goal Result or Selected Goal */}
        {(currentGoal || selectedGoal) && (
          <Card className="border-2 border-indigo-300 shadow-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CheckCircle2 className="w-7 h-7" />
                    Goal Breakdown
                  </CardTitle>
                  <CardDescription className="text-indigo-100 text-base mt-2">
                    <span className="font-semibold text-white">Goal:</span> {(currentGoal || selectedGoal)?.goal_text}
                  </CardDescription>
                </div>
                {selectedGoal && !currentGoal && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedGoal(null)}
                    className="text-white hover:bg-white/20"
                  >
                    Close
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border-2 border-indigo-200">
                <div className="flex items-center gap-4 mb-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span className="text-base font-semibold text-gray-700">Complexity Score</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-4 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full shadow-lg transition-all duration-1000"
                      style={{ width: `${((currentGoal || selectedGoal)!.complexity_score / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-xl font-bold text-indigo-600 min-w-[60px] text-right">
                    {(currentGoal || selectedGoal)!.complexity_score.toFixed(1)}/10
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                  <ListChecks className="w-6 h-6 text-indigo-600" />
                  Actionable Steps
                </h3>
                <ol className="space-y-3">
                  {(currentGoal || selectedGoal)!.tasks
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <li
                        key={task.id}
                        className="flex gap-4 p-4 bg-white rounded-xl border-2 border-indigo-100 shadow-md hover:shadow-lg hover:border-indigo-300 transition-all duration-200 animate-in fade-in slide-in-from-left"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                          {task.order}
                        </span>
                        <span className="flex-1 text-gray-700 text-base leading-relaxed pt-1">{task.task_text}</span>
                      </li>
                    ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Goals List */}
        <Card className="border-2 border-gray-200 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b-2">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6 text-indigo-600" />
                  All Your Goals
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {allGoals.length > 0 
                    ? `${allGoals.length} goal${allGoals.length > 1 ? 's' : ''} broken down and ready to achieve`
                    : 'Your goal breakdowns will appear here'
                  }
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={loadAllGoals}
                  disabled={loadingGoals}
                  className="border-2 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  {loadingGoals ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </>
                  )}
                </Button>
                {showAllGoals && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAllGoals(false);
                      setSelectedGoal(null);
                    }}
                    className="border-2 hover:bg-gray-50 transition-colors"
                  >
                    Hide
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {!showAllGoals ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Target className="w-10 h-10 text-indigo-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">Click "Refresh" to view all goals</p>
                <p className="text-gray-400 text-sm">Your broken down goals will appear here</p>
              </div>
            ) : allGoals.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Target className="w-10 h-10 text-indigo-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">No goals yet</p>
                <p className="text-gray-400 text-sm">Create your first goal above to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allGoals.map((goal) => (
                  <Card 
                    key={goal.id} 
                    onClick={() => {
                      setSelectedGoal(goal);
                      setCurrentGoal(null); // Clear current goal if viewing from list
                      // Scroll to top to see the selected goal breakdown
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`bg-white border-2 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl ${
                      selectedGoal?.id === goal.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className={`text-lg font-bold transition-colors line-clamp-2 ${
                            selectedGoal?.id === goal.id ? 'text-indigo-700' : 'text-gray-800'
                          }`}>
                            {goal.goal_text}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2 flex-wrap">
                            <span className="flex items-center gap-1.5">
                              <TrendingUp className="w-4 h-4 text-indigo-500" />
                              <span className="font-semibold text-indigo-600">
                                {goal.complexity_score.toFixed(1)}/10
                              </span>
                              <span className="text-gray-500">complexity</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500">
                                {new Date(goal.created_at).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <ListChecks className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500">{goal.tasks.length} steps</span>
                            </span>
                          </CardDescription>
                        </div>
                        <div className="text-indigo-600 font-semibold text-sm">
                          {selectedGoal?.id === goal.id ? '✓ Selected' : 'Click to view →'}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

