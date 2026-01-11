import mandalaImage from 'figma:asset/4397814bb644d6ff043220d55a7577c634037246.png';

export function MandalaWatermark() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15]">
      <img
        src={mandalaImage}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] object-contain brightness-75"
        loading="lazy"
      />
    </div>
  );
}