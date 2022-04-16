import { writeFile } from 'fs/promises';
import { error, invalid, MessageBody, SomeResponse, successMsg } from '../../lib/response';
import { join, resolve } from 'path';
import appRoot from 'app-root-path';

export const post = async ({ request }): Promise<SomeResponse<MessageBody>> => {
    const data: FormData = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
        return invalid('No file uploaded.');
    }

    try {
        const root = resolve('./');
        const name = join(root, 'static', file?.name);
        console.info(root, name, appRoot);
        await writeFile(name, file.stream());

        return successMsg('File updated.');
    } catch (e) {
        console.error('Error uploading file', e);
        return error('Error write file.');
    }
};
