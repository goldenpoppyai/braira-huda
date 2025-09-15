import { useState, useCallback } from 'react';

interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  model: string;
}

interface SpeechOptions {
  text: string;
  voiceSettings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export function useElevenLabs(config?: ElevenLabsConfig) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(config?.apiKey || '');
  
  // Default voice configurations for different languages
  const voiceConfigs = {
    en: { voiceId: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah' }, // Professional English
    ar: { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' }, // Arabic voice
    ms: { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam' }, // Malay/Indonesian
    fr: { voiceId: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice' }, // French
    id: { voiceId: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam' }, // Indonesian
    hi: { voiceId: 'pNInz6obpgDQGcFmaJgB', name: 'Adam' } // Hindi
  };

  const synthesizeSpeech = useCallback(async (options: SpeechOptions, language: string = 'en') => {
    if (!apiKey) {
      setError('ElevenLabs API key not provided');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const voiceConfig = voiceConfigs[language as keyof typeof voiceConfigs] || voiceConfigs.en;
      const voiceId = config?.voiceId || voiceConfig.voiceId;
      const model = config?.model || 'eleven_multilingual_v2';

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: options.text,
          model_id: model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true,
            ...options.voiceSettings
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return audioUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, config]);

  const playAudio = useCallback(async (audioUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      
      audio.play().catch(reject);
    });
  }, []);

  const speak = useCallback(async (text: string, language: string = 'en'): Promise<void> => {
    const audioUrl = await synthesizeSpeech({ text }, language);
    if (audioUrl) {
      await playAudio(audioUrl);
    }
  }, [synthesizeSpeech, playAudio]);

  const getAvailableVoices = useCallback(() => {
    return voiceConfigs;
  }, []);

  return {
    synthesizeSpeech,
    speak,
    playAudio,
    isLoading,
    error,
    setApiKey,
    getAvailableVoices,
    hasApiKey: !!apiKey
  };
}