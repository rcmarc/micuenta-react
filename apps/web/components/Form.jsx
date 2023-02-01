import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Form({
  defaultValues,
  resolver,
  onSubmit,
  spacing,
  children,
}) {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver });

  useEffect(() => {
    const first = React.Children.toArray(children)[0];
    if (first && first.props.name) {
      setFocus(first.props.name);
    }
  }, [children, setFocus]);

  return (
    <form
      className={clsx('flex w-full flex-col', {
        'gap-7': spacing === 'sm',
        'gap-10': !spacing || spacing === 'md',
        'gap-12': spacing === 'lg',
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              key: child.props.name,
              error: errors[child.props.name],
              ...register(child.props.name),
              ...child.props,
            })
          : child;
      })}
    </form>
  );
}
