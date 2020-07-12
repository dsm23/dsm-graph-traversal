import tw, { styled } from 'twin.macro';

interface Props {
  isOdd: boolean;
  children: number;
}

const GridItem = styled.div<Props>(({ children, isOdd }) => [
  tw`text-gray-900 flex-grow flex items-center justify-center border w-full h-full`,
  isOdd && tw`bg-gray-100`,
  children && children >= 2 && tw`bg-yellow-300 `,
  children && children >= 5 && tw`bg-orange-300 `,
  children && children >= 10 && tw`bg-red-300 `,
]);

export { GridItem };
