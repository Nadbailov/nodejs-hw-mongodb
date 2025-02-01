import { getContact, getContactById, createContact, deleteContactById, updateContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactController = async (req, res, next,) => {
  try { const contacts = await getContact();

      res.json({
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts,
      });
    } catch(err) {
		next(err);
	}
};

    export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

        if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContactById(contactId);

    if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body, {
        upsert: true,
    });

    if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
      data: result,
  });
};
