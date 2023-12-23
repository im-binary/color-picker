import { Root, Track, Thumb, Range } from '@radix-ui/react-slider';

interface SliderProps {
  hueColor?: string;
  onChange?: (value: number[]) => void;
  thumbColor: string;
}

export function Slider({ hueColor, onChange, thumbColor }: SliderProps) {
  return (
    <Root 
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        touchAction: 'none',
        width: 'auto',
        height: '52px',
        margin: '0 16px',
      }}
      defaultValue={[0]}
      max={360}
      step={1}
      value={[Number(hueColor)]}
      onValueChange={onChange}
    >
      <Track 
        style={{
          position: 'relative',
          flexGrow: '1',
          borderRadius: '9999px',
          height: '8px',
          background: 'linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))',
        }}
      >
        <Range style={{
          position: 'absolute',
          borderRadius: '9999px',
          height: '100%',
        }} />
      </Track>
      <Thumb style={{
        display: 'block',
        width: '24px',
        height: '24px',
        backgroundColor: `${thumbColor}`,
        borderRadius: '50%',
        border: '2px solid white',
        outline: 'none'
      }} aria-label="Volume" />
    </Root>
  );
}
