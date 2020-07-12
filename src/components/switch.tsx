// Thanks matyunya! https://github.com/matyunya/smelte/blob/e893c96b32a464dc1f0f9c728ddfb19f72c1ff81/src/components/Switch/Switch.svelte

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, MouseEventHandler, HTMLAttributes } from 'react';
import 'twin.macro';
import tw, { styled } from 'twin.macro';

const Label = tw.label`pl-2 cursor-pointer`;

const Track = styled.div<{ checked: boolean }>(({ checked }) => [
  tw`relative w-10 h-4 z-0 rounded-full overflow-visible flex items-center justify-center bg-teal-900`,
  checked ? tw`bg-teal-400` : tw`bg-gray-700`,
]);

const Thumb = styled.div<{ checked: boolean }>(({ checked }) => [
  tw`rounded-full p-2 w-5 h-5 absolute border shadow-2xl duration-100 bg-white left-0`,
  checked && tw`bg-teal-700`,
  checked && {
    left: '1.25rem',
  },
]);

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  label: string;
}

const Switch: FunctionComponent<Props> = ({
  checked,
  onClick,
  label,
  ...props
}) => (
  <div
    tw="inline-flex items-center mb-2 cursor-pointer z-10"
    onClick={onClick}
    {...props}
  >
    <input tw="hidden" type="checkbox" />
    <Track checked={checked}>
      <div tw="w-full h-full absolute" />

      <Thumb checked={checked} />
    </Track>
    <Label aria-hidden="true">{label}</Label>
  </div>
);

export { Switch };
