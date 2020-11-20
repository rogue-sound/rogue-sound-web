import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
/** Actions */
import { createRoom } from '@context/rooms';
/** Common components */
import Dropdown from '@common/Dropdown';
import Button from '@common/Button';
import Input from '@common/Input';
/** Styles */
import './CreateRoom.scss';

const styles = [
  { id: 'chill', name: 'Chill' },
  { id: 'random', name: 'Random' },
  { id: 'party', name: 'Party' },
];

const CreateRoom = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, reset, errors } = useForm();
  const style = watch('style'); // Necessary to reset style custom form field

  const handleStyleChange = selectedStyle => {
    setValue('style', selectedStyle, { shouldValidate: true });
  };

  const onSubmit = (data, event) => {
    event.preventDefault();

    if (errors && Object.keys(errors).length) return;

    dispatch(createRoom(data));

    reset();
  };

  useEffect(() => {
    register({ name: 'style' }, { required: 'Style is required.' });
  }, [register]);

  return (
    <div className="create-room__container">
      <h1 className="create-room__title">Create a room</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-room__form">
        <div className="create-room__name">
          <Input
            ref={register({ required: 'A name is required.' })}
            name="name"
            className="create-room__input"
            placeholder="Room name"
            autoComplete="off"
            error={errors.name}
          />
        </div>
        <div className="create-room__style">
          <Dropdown
            options={styles}
            value={style}
            placeholder="Select a style"
            error={errors.style}
            onChange={handleStyleChange}
          />
        </div>
        <Button theme="create" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

CreateRoom.propTypes = {};

export default CreateRoom;
