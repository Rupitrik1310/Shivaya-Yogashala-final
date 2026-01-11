import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import muladharaChakra from 'figma:asset/bb4d85966627cf9e98978ac3558ef98748eb3fb4.png';
import svadhisthanaChakra from 'figma:asset/e76e13fb67ce49a3701a03e4781b21c9d3f4cd92.png';
import manipuraChakra from 'figma:asset/4f4a6f86fc026ea45d508a8c7e322ab0d77004e0.png';
import anahataChakra from 'figma:asset/c773a2051471dd05ae04d366e6d34b250e81c458.png';
import vishuddhaChakra from 'figma:asset/4f266c813385f7cecbac595e38805506d11dcdf3.png';
import ajnaChakra from 'figma:asset/b89116ec932975bb58e32b7d77eb1420e9daf1f6.png';
import sahasraraChakra from 'figma:asset/2fc477e5854314a628b21ad802ce77fcd2612fea.png';

interface Chakra {
  name: string;
  sanskrit: string;
  color: string;
  meaning: string;
  location: string;
  image?: string;
}

const chakras: Chakra[] = [
  {
    name: "Root Chakra",
    sanskrit: "मूलाधार (Muladhara)",
    color: "#C41E3A",
    meaning: "Grounding, Stability, Security",
    location: "Base of spine",
    image: muladharaChakra
  },
  {
    name: "Sacral Chakra",
    sanskrit: "स्वाधिष्ठान (Svadhisthana)",
    color: "#FF6B35",
    meaning: "Creativity, Passion, Pleasure",
    location: "Lower abdomen",
    image: svadhisthanaChakra
  },
  {
    name: "Solar Plexus",
    sanskrit: "मणिपूर (Manipura)",
    color: "#F4A261",
    meaning: "Power, Confidence, Transformation",
    location: "Upper abdomen",
    image: manipuraChakra
  },
  {
    name: "Heart Chakra",
    sanskrit: "अनाहत (Anahata)",
    color: "#2A9D8F",
    meaning: "Love, Compassion, Healing",
    location: "Center of chest",
    image: anahataChakra
  },
  {
    name: "Throat Chakra",
    sanskrit: "विशुद्ध (Vishuddha)",
    color: "#1E88A8",
    meaning: "Communication, Truth, Expression",
    location: "Throat",
    image: vishuddhaChakra
  },
  {
    name: "Third Eye",
    sanskrit: "आज्ञा (Ajna)",
    color: "#4A5899",
    meaning: "Intuition, Wisdom, Insight",
    location: "Between eyebrows",
    image: ajnaChakra
  },
  {
    name: "Crown Chakra",
    sanskrit: "सहस्रार (Sahasrara)",
    color: "#9B59B6",
    meaning: "Enlightenment, Divine Connection",
    location: "Top of head",
    image: sahasraraChakra
  }
];

export function ChakraBar() {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-center gap-2 md:gap-3 py-2">
        {chakras.map((chakra, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div 
                className="w-10 h-10 md:w-12 md:h-12 cursor-pointer transition-all hover:scale-125 hover:shadow-xl relative group"
              >
                {chakra.image ? (
                  <img 
                    src={chakra.image} 
                    alt={chakra.name}
                    className="w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all"
                  />
                ) : (
                  <div 
                    className="w-full h-full rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: chakra.color }}
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-3 bg-white/95 backdrop-blur-sm">
              <div className="space-y-1">
                <p className="font-medium">{chakra.name}</p>
                <p className="text-sm text-muted-foreground">{chakra.sanskrit}</p>
                <p className="text-sm">{chakra.meaning}</p>
                <p className="text-xs text-muted-foreground">{chakra.location}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
