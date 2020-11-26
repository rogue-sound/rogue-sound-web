import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
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
  const { username, displayName } = useSelector(state => state.me);
  const { register, handleSubmit, watch, setValue, reset, errors } = useForm();
  const style = watch('style'); // Necessary to reset style custom form field
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleStyleChange = selectedStyle => {
    setValue('style', selectedStyle, { shouldValidate: true });
  };

  const onSubmit = (data, event) => {
    event.preventDefault();

    if (errors && Object.keys(errors).length) return;

    console.log('[onSubmit]');
    dispatch(createRoom(data, { username, displayName }));

    reset();
  };

  useEffect(() => {
    register(
      { name: 'style' },
      {
        required: intl.formatMessage({
          id: 'app.pages.Rooms.CreateRoom.CreateRoomFormStyleRequiredText',
        }),
      }
    );
  }, [register]);

  return (
    <div className="create-room__container">
      <h1 className="create-room__title">
        {intl.formatMessage({
          id: 'app.pages.Rooms.CreateRoom.CreateRoomFormTitle',
        })}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-room__form">
        <div className="create-room__name">
          <Input
            ref={register({
              required: intl.formatMessage({
                id: 'app.pages.Rooms.CreateRoom.CreateRoomFormNameRequiredText',
              }),
            })}
            name="name"
            className="create-room__input"
            placeholder={intl.formatMessage({
              id: 'app.pages.Rooms.CreateRoom.CreateRoomNamePlaceholder',
            })}
            autoComplete="off"
            error={errors.name}
          />
        </div>
        <div className="create-room__style">
          <Dropdown
            options={styles}
            value={style}
            placeholder={intl.formatMessage({
              id: 'app.pages.Rooms.CreateRoom.CreateRoomStylePlaceholder',
            })}
            error={errors.style}
            onChange={handleStyleChange}
          />
        </div>
        <Button theme="create" type="submit">
          {intl.formatMessage({
            id: 'app.pages.Rooms.CreateRoom.CreateRoomButtonText',
          })}
        </Button>
      </form>
    </div>
  );
};

CreateRoom.propTypes = {};

export default CreateRoom;
