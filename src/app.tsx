/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  useEffect,
  useRef,
  useState,
  Fragment,
  KeyboardEventHandler,
} from 'react';
import 'twin.macro';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Button, Header, Input, Output, Small, Switch } from './components';

interface FormData {
  dimensions?: number;
  pizzerias?: number;
  fullInput?: string;
}

type FieldType = {
  listPizzerias?: {
    X: number;
    Y: number;
    R: number;
  }[];
};

function App() {
  const [checked, setChecked] = useState<boolean>(false);

  const toggle = () => setChecked(prevChecked => !prevChecked);

  const [data, setData] = useState<number[][]>([[]]);

  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const { control, register, handleSubmit, watch, errors, formState } = methods;

  const { fields, append, remove } = useFieldArray<FieldType>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'listPizzerias', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const maxNumber = useRef<number>(0);

  const { isSubmitting } = formState;

  useEffect(() => {
    // reset
    if (isSubmitting) {
      maxNumber.current = 0;
    }
  }, [isSubmitting]);

  const onSubmit = (data: FormData & FieldType) => {
    const num = data.dimensions as number;

    let cityMap = Array.from({ length: num }, () =>
      Array.from({ length: num }, () => 0),
    );

    if (data.listPizzerias && data.listPizzerias.length > 0) {
      for (const { X, Y, R } of data.listPizzerias) {
        // coords to array
        const x = X - 1;
        const y = num - Y;

        for (let i = Math.max(0, x - R); i <= Math.min(num - 1, x + R); i++) {
          for (let j = Math.max(0, y - R); j <= Math.min(num - 1, y + R); j++) {
            const { abs } = Math;
            if (abs(x - i) + abs(y - j) <= R) {
              cityMap[j][i] += 1;
              if (cityMap[j][i] > maxNumber.current) {
                maxNumber.current = cityMap[j][i];
              }
            }
          }
        }
      }
    }

    setData(cityMap);
  };

  const onSubmitTextarea = (data: FormData & FieldType) => {
    const fullInput = data.fullInput as string;
    const indexFirstLineBreak = fullInput.indexOf('\n');

    const firstLine = fullInput.substr(0, indexFirstLineBreak);
    const [dimensions] = firstLine.split(' ').map(Number);

    let cityMap = Array.from({ length: dimensions }, () =>
      Array.from({ length: dimensions }, () => 0),
    );

    const listPizzerias = fullInput.substr(indexFirstLineBreak).split('\n');

    if (listPizzerias.length > 0) {
      for (const lineStr of listPizzerias) {
        const [X, Y, R] = lineStr.split(' ').map(Number);
        // coords to array
        const x = X - 1;
        const y = dimensions - Y;

        for (
          let i = Math.max(0, x - R);
          i <= Math.min(dimensions - 1, x + R);
          i++
        ) {
          for (
            let j = Math.max(0, y - R);
            j <= Math.min(dimensions - 1, y + R);
            j++
          ) {
            const { abs } = Math;
            if (abs(x - i) + abs(y - j) <= R) {
              cityMap[j][i] += 1;
              if (cityMap[j][i] > maxNumber.current) {
                maxNumber.current = cityMap[j][i];
              }
            }
          }
        }
      }
    }

    setData(cityMap);
  };

  const handleChange = () => {
    const pizzerias = Number(watch('pizzerias'));

    const len = fields.length;

    if (!pizzerias) {
      return null;
    } else if (pizzerias > len) {
      const diff = pizzerias - len;
      append(
        // @ts-ignore
        Array.from({ length: diff }, () => ({
          X: 0,
          Y: 0,
          R: 0,
        })),
        false,
      );
    } else if (pizzerias < len) {
      const diff = len - pizzerias;
      const arr = Array.from({ length: diff }, (_, i) => i + pizzerias);
      remove(arr);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === 'Enter') {
      return toggle();
    }
  };

  const ref = register({
    required: 'required',
    max: {
      value: 1000,
      message: 'interval between 1 and 1000',
    },
    min: {
      value: 1,
      message: 'interval between 1 and 1000',
    },
  });

  return (
    <div tw="mx-4">
      <Header />
      <main tw="container mx-auto mt-12">
        <Switch
          checked={checked}
          onClick={toggle}
          label={checked ? 'Textarea format' : 'Grid format'}
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />
        <FormProvider {...methods}>
          <form
            tw="w-full mt-10"
            onSubmit={handleSubmit(checked ? onSubmitTextarea : onSubmit)}
          >
            <div tw="flex flex-wrap">
              {!checked ? (
                <Fragment>
                  <div tw="flex-grow w-full md:w-1/2 mb-6 md:mb-0">
                    <Input
                      name="dimensions"
                      type="number"
                      placeholder="Enter dimensions"
                      aria-label="dimensions"
                      ref={ref}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="dimensions"
                      as={Small}
                    />
                  </div>
                  <div tw="flex-grow w-full md:w-1/2">
                    <Input
                      name="pizzerias"
                      type="number"
                      placeholder="Enter number of pizzerias"
                      aria-label="Number of pizzerias"
                      ref={ref}
                      onChange={handleChange}
                    />
                    <ErrorMessage errors={errors} name="pizzerias" as={Small} />
                  </div>
                </Fragment>
              ) : (
                <div tw="flex-grow w-full md:w-1/2">
                  <Input
                    // @ts-ignore
                    as="textarea"
                    rows="5"
                    name="fullInput"
                    placeholder={`Enter full string multiline input e.g.
5 2
3 3 2
1 1 2
                    `}
                    aria-label="Number of pizzerias"
                    ref={ref}
                  />
                  <ErrorMessage errors={errors} name="fullInput" as={Small} />
                </div>
              )}
            </div>
            <div>
              {fields.length > 0 && (
                <h2 tw="text-gray-500 font-semibold uppercase mt-8 mb-4 tracking-widest">
                  List of pizzerias
                </h2>
              )}
              {/* important: using id from to track item added or removed */}
              {fields.map((field: any, index) => (
                <div
                  key={field.id}
                  tw="md:inline-flex flex-grow w-full mb-6 md:mb-0 first:mt-6"
                >
                  <Input
                    name={`listPizzerias[${index}].X`}
                    placeholder="X coordinate"
                    ref={register({
                      required: 'required',
                      min: {
                        value: 1,
                        message: 'X co-ordinate greater than 1',
                      },
                    })}
                    aria-label="X coordinate"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`listPizzerias[${index}].X`}
                    as={Small}
                  />
                  <Input
                    name={`listPizzerias[${index}].Y`}
                    placeholder="Y coordinate"
                    ref={register({
                      required: 'required',
                      min: {
                        value: 1,
                        message: 'Y co-ordinate greater than 1',
                      },
                    })}
                    aria-label="Y coordinate"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`listPizzerias[${index}].Y`}
                    as={Small}
                  />
                  <Input
                    name={`listPizzerias[${index}].R`}
                    placeholder="R radius"
                    ref={register({
                      required: 'required',
                      max: {
                        value: 100,
                        message: 'interval between 1 and 100',
                      },
                      min: {
                        value: 1,
                        message: 'interval between 1 and 100',
                      },
                    })}
                    aria-label="radius"
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`listPizzerias[${index}].R`}
                    as={Small}
                  />
                </div>
              ))}
            </div>
            <Button tw="mt-6" type="submit">
              Submit
            </Button>
          </form>
          {isSubmitting && (
            <div tw="tracking-widest font-mono">Is Submitting...</div>
          )}
          <Output data={data} maxNumber={maxNumber.current} />
        </FormProvider>
      </main>
    </div>
  );
}

export default App;
