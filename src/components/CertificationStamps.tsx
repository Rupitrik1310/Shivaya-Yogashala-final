import rys200Badge from 'figma:asset/1fcd98a64644758c74511279ac772122809ba4a0.png';
import rys300Badge from 'figma:asset/910ab8f3e2147b5028e6434ae2b861ec06e3ff46.png';
import rys500Badge from 'figma:asset/58a2cf39959f1b6c62ce1d6d322aeaee75ca2614.png';

export function CertificationStamps() {
  const certifications = [
    { 
      hours: '200', 
      title: 'Foundation Level',
      image: rys200Badge
    },
    { 
      hours: '300', 
      title: 'Advanced Level',
      image: rys300Badge
    },
    { 
      hours: '500', 
      title: 'Master Level',
      image: rys500Badge
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-primary text-2xl md:text-3xl mb-2">
          Shivaya Yogashala Teacher Training Center
          <br />
          <span className="text-sm mt-2 inline-block">Rishikesh, India</span>
        </h3>
        <div className="w-32 h-1 bg-secondary mx-auto" />
      </div>

      {/* Certification Stamps */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-6">
        {certifications.map((cert) => (
          <div 
            key={cert.hours}
            className="relative group flex flex-col items-center"
          >
            {/* Certificate Stamp Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
              <img 
                src={cert.image} 
                alt={`RYS ${cert.hours} - Registered Yoga School`}
                className="w-full h-full object-contain bg-white"
              />
            </div>

            {/* Title Below */}
            <div className="text-center mt-4">
              <p className="text-sm text-primary tracking-wide">{cert.title}</p>
              <p className="text-xs text-muted-foreground mt-1">Yoga Alliance Certified</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
