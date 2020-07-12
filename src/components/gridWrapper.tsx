import tw, { styled } from 'twin.macro';

const GridWrapper = styled.div([
  tw`scrolling-touch overflow-x-auto w-full`,
  {
    height: '100rem',
    maxHeight: '99%',
  },
]);

export { GridWrapper };
