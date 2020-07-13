/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import 'twin.macro';

const Retrospective = () => (
  <Fragment>
    <h2 tw="text-gray-500 font-semibold uppercase mt-16 tracking-widest">
      Approach
    </h2>
    <p tw="text-gray-900 mt-4">
      First a 2D array filled with 0s to represent the city is created. Then I
      loop through the list of pizzerias and then nested loop through a square
      of with sides 2R + 1 or smaller rectangle if at the edges of the city for
      each pizzeria and increment the representative number in the city map.
      Finding whether a block is within the radius of a pizzeria is horizontal
      distance from pizzeria + vertical distance from pizzeria {'<='} R. A check
      is made for max number for each city block in the square around the
      pizzeria.
    </p>
    <h2 tw="text-gray-500 font-semibold uppercase mt-8 tracking-widest">
      Complexity:{' '}
      <span tw="text-gray-900">
        O<span tw="text-2xl align-middle">(</span>N<sup>2</sup> + M * (2R+1)
        <sup>2</sup>
        <span tw="text-2xl align-middle">)</span>
      </span>
    </h2>
    <h2 tw="text-gray-500 font-semibold uppercase mt-8 tracking-widest">
      Improvement
    </h2>
    <p tw="text-gray-900 mt-4">
      It was sometime into the solution that I realised that the task did not
      ask for the visual representation of the city thus a matrix representation
      of they city was unnecessary since. Instead of initially a 2D arrayI
      should have made a list where the key of each city block is
      `rowIndex-columnIndex` and incremented the number value of key when
      looping through the list of pizzerias. There would be no need to
      initialise the list and simply append blocks during the loop. I could
      possibly improve the radius search by acknowledging that along the axis,
      at furthest radius will only be 1 and then increase by 2 as you get closer
      to the pizzeria. I did not get this working while also accounting for city
      edges. The most readable way of finding the max block in JavaScript is
      Math.max(...Object.values(createdList)). However this may not be as
      performant as a bubble search. I did not try a bubble search with my 2D
      matrix since all items are 1D arrays with equal length thus meaning there
      is not anything that quickly distinguishes each array. Flattening the 2D
      array did not work since for N = 1000 that created an array with a length
      too large for the call stack.
    </p>
  </Fragment>
);

export { Retrospective };
