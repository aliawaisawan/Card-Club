import React from 'react';
import { data } from './utils/data';
import { DesignFrame } from '@lidojs/editor';

const EditorContent = () => {
    return <DesignFrame data={data} />;
};

export default EditorContent;
