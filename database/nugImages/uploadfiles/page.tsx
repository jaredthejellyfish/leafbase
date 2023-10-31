'use client';

import { useFormState } from 'react-dom';
import React from 'react';

import { deleteFiles, uploadFiles } from './actions';

const initialState = {
  status: null,
};

export default function MyForm() {
  const [state, formAction] = useFormState(uploadFiles, initialState);

  return (
    <>
    <form action={formAction}>
      <input name="files" type="file" multiple />
      <button type="submit" name="submit">
        Upload
      </button>
      <br />
      <div id="status">{state.status}</div>
    </form>
    <form action={deleteFiles}>
    <button type="submit" name="delete">
      Delete all files
    </button>
    <br />
    <div id="status">{state.status}</div>
  </form>
    </>
  );
}
