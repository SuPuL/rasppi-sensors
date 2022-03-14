import { writeFile } from 'fs/promises';
import { error, invalid, MessageBody, SomeResponse, successMsg, SuccessOrError } from '../../lib/response';
import { join } from 'path';

export const post = async ({ request }): Promise<SomeResponse<MessageBody>> => {
    const data: FormData = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
        return invalid('No file uploaded.');
    }

    try {
        const name = join('static', file?.name);
        await writeFile(name, file.stream());

        return successMsg('File updated.');
    } catch (e) {
        console.error('Error uploading file', e);
        return error('Error write file.');
    }
};
