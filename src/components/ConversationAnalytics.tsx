import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Brain, 
  MessageSquare, 
  Clock, 
  Languages,
  Target,
  Users,
  Star,
  RefreshCw
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { aiLearningEngine } from '@/lib/aiLearning';

interface AnalyticsData {
  totalPatterns: number;
  topIntents: Array<{intent: string, count: number}>;
  languageDistribution: Record<string, number>;
  confidenceMetrics: {
    average: number;
    min: number;
    max: number;
  };
  userBehavior: {
    commonIntents: Record<string, number>;
    preferredTimeOfDay: Record<string, number>;
    averageSessionLength: number;
    satisfactionRating: number;
  };
  learningTrends: {
    weeklyGrowth: number;
    topGrowingIntents: Array<{intent: string, count: number}>;
  };
}

export function ConversationAnalytics() {
  const { t, language } = useI18n();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = aiLearningEngine.getLearningAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatIntent = (intent: string): string => {
    return intent.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getLanguageName = (code: string): string => {
    const names: Record<string, string> = {
      en: 'English',
      ar: 'العربية',
      ms: 'Bahasa Melayu',
      fr: 'Français',
      id: 'Bahasa Indonesia',
      hi: 'हिन्दी'
    };
    return names[code] || code;
  };

  const getTimeSlotName = (slot: string): string => {
    const names: Record<string, string> = {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening'
    };
    return names[slot] || slot;
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading analytics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No analytics data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Brain className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Learned Patterns</p>
              <p className="text-2xl font-bold">{analytics.totalPatterns}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
              <p className="text-2xl font-bold">{(analytics.confidenceMetrics.average * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Growth</p>
              <p className="text-2xl font-bold">+{analytics.learningTrends.weeklyGrowth}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Star className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Satisfaction</p>
              <p className="text-2xl font-bold">{analytics.userBehavior.satisfactionRating.toFixed(1)}/5</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Intents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Top Intents</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.topIntents.map((intent, index) => (
              <div key={intent.intent} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{formatIntent(intent.intent)}</span>
                  <Badge variant="outline">{intent.count}</Badge>
                </div>
                <Progress 
                  value={(intent.count / analytics.topIntents[0]?.count) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Languages className="h-5 w-5" />
              <span>Language Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.languageDistribution).map(([lang, count]) => (
              <div key={lang} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{getLanguageName(lang)}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
                <Progress 
                  value={(count / Object.values(analytics.languageDistribution).reduce((a, b) => a + b, 0)) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Time Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Time Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.userBehavior.preferredTimeOfDay).map(([time, count]) => (
              <div key={time} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{getTimeSlotName(time)}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
                <Progress 
                  value={(count / Object.values(analytics.userBehavior.preferredTimeOfDay).reduce((a, b) => a + b, 0)) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Confidence Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Confidence Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average</span>
                <span className="font-medium">{(analytics.confidenceMetrics.average * 100).toFixed(1)}%</span>
              </div>
              <Progress value={analytics.confidenceMetrics.average * 100} className="h-2" />
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Minimum</p>
                  <p className="font-medium">{(analytics.confidenceMetrics.min * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Maximum</p>
                  <p className="font-medium">{(analytics.confidenceMetrics.max * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growing Intents */}
      {analytics.learningTrends.topGrowingIntents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Trending Intents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analytics.learningTrends.topGrowingIntents.map((intent) => (
                <Badge 
                  key={intent.intent} 
                  variant="outline" 
                  className="bg-accent/10 text-accent-foreground border-accent/20"
                >
                  {formatIntent(intent.intent)} (+{intent.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          onClick={loadAnalytics}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Analytics</span>
        </Button>
      </div>
    </div>
  );
}