/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, HTMLAttributes } from 'react';
import { FixedSizeGrid } from 'react-window';

import 'twin.macro';

import { GridItem } from './gridItem';
import { GridWrapper } from './gridWrapper';

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: number[][];
}

const CellTest = ({ data, columnIndex, rowIndex, style }: any) => (
  <GridItem
    style={style}
    isOdd={Boolean((rowIndex % 2 === 0) !== (columnIndex % 2 === 0))}
  >
    {data[rowIndex][columnIndex]}
  </GridItem>
);

const Grid: FunctionComponent<Props> = ({ data, ...props }) => (
  // <div tw="scrolling-touch overflow-x-auto" {...props}>
  //   {data.map((dataArray: number[], i) => (
  //     <div key={`data-grid-row-${i}`} tw="inline-flex flex-grow m-auto w-full">
  //       {dataArray.map((numValue: number, j) => (
  //         <GridItem
  //           key={`data-grid-row-${i}-column-${j}`}
  //           num={dataArray.length}
  //           isOdd={Boolean((i % 2 === 0) !== (j % 2 === 0))}
  //         >
  //           {numValue}
  //         </GridItem>
  //       ))}
  //     </div>
  //   ))}
  // </div>
  <GridWrapper {...props}>
    <FixedSizeGrid
      columnCount={Math.min(50, data.length)}
      rowCount={Math.min(50, data.length)}
      itemData={data}
      columnWidth={100}
      rowHeight={100}
      height={100 * data.length}
      width={100 * data.length}
    >
      {CellTest}
    </FixedSizeGrid>
  </GridWrapper>
);

export { Grid };
