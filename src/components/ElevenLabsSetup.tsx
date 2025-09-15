import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Volume2, Key, Check, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface ElevenLabsSetupProps {
  onApiKeySet: (apiKey: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ElevenLabsSetup({ onApiKeySet, isOpen, onClose }: ElevenLabsSetupProps) {
  const { t } = useI18n();
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateApiKey = async (key: string) => {
    if (!key || key.length < 10) {
      setValidationError('Please enter a valid API key');
      return false;
    }

    setIsValidating(true);
    setValidationError(null);

    try {
      // Test the API key with a simple request
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': key
        }
      });

      if (response.ok) {
        return true;
      } else {
        setValidationError('Invalid API key. Please check your key and try again.');
        return false;
      }
    } catch (error) {
      setValidationError('Unable to validate API key. Please check your connection.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateApiKey(apiKey);
    if (isValid) {
      onApiKeySet(apiKey);
      onClose();
    }
  };

  const voiceOptions = [
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', language: 'English', description: 'Professional, clear' },
    { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', language: 'Arabic/Hindi', description: 'Warm, friendly' },
    { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', language: 'Malay/Indonesian', description: 'Confident, articulate' },
    { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', language: 'French', description: 'Elegant, sophisticated' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-primary" />
              <CardTitle>Enable Voice Features</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              To enable high-quality text-to-speech in multiple languages, please provide your ElevenLabs API key. 
              This will enhance Huda's voice responses with natural, multilingual speech.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apikey">ElevenLabs API Key</Label>
              <Input
                id="apikey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key..."
                className="font-mono"
              />
              {validationError && (
                <p className="text-sm text-red-500">{validationError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Voice Configuration</Label>
              <div className="grid grid-cols-1 gap-2">
                {voiceOptions.map((voice) => (
                  <div key={voice.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-medium">{voice.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {voice.language}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{voice.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={isValidating || !apiKey} className="flex-1">
                {isValidating ? (
                  'Validating...'
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Enable Voice
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Skip
              </Button>
            </div>
          </form>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Get your free API key at elevenlabs.io</p>
            <p>• 10,000 free characters per month</p>
            <p>• Supports 29+ languages including Arabic</p>
            <p>• Your key is stored locally and never shared</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}