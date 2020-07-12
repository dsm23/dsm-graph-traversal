/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import 'twin.macro';

import { Grid } from './grid';

interface Props {
  data: number[][];
  maxNumber: number;
}

type Overload = (props: Props) => JSX.Element | null;

const Output: Overload = ({ data, maxNumber }) => {
  const { formState } = useFormContext();

  const { isSubmitted, isValid } = formState;

  return !(isSubmitted && isValid) ? null : (
    <Fragment>
      <h2 tw="text-gray-500 font-semibold uppercase mt-24 tracking-widest">
        Number of pizzas at block with greatest selection:{' '}
        <span tw="text-gray-900">{maxNumber}</span>
      </h2>
      <h2 tw="text-gray-500 font-semibold uppercase mt-10 tracking-widest">
        City map
      </h2>
      <Grid tw="mt-4 mb-20" data={data} />
    </Fragment>
  );
};

export { Output };
