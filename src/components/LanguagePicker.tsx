import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useI18n, languages, Language } from '@/lib/i18n';

export function LanguagePicker() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(l => l.code === language);
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-accent/20 hover:border-accent/40 hover:bg-accent/10 transition-luxury"
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="font-medium">{currentLanguage?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[180px] bg-card/95 backdrop-blur-sm border-accent/20 elegant-shadow"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code as Language);
              setIsOpen(false);
            }}
            className={`cursor-pointer transition-smooth hover:bg-accent/10 focus:bg-accent/10 ${
              language === lang.code ? 'bg-accent/20 text-accent-foreground font-medium' : ''
            }`}
            dir={lang.dir}
          >
            <div className="flex items-center justify-between w-full">
              <span className={lang.code === 'ar' ? 'font-arabic' : ''}>{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground ml-2">{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}