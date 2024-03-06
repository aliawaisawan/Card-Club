import React, { useState } from 'react';
import TextTIcon from '@duyank/icons/regular/TextT';
import SquareIcon from '@duyank/icons/regular/Square';
import UploadIcon from '@duyank/icons/regular/Upload';
import PiggyBankIcon from '@duyank/icons/regular/PiggyBank';
import { useEditor } from '@lidojs/editor';
import SidebarTab from './tabs/TabList';
import TextContent from './sidebar/TextContent';
import ShapeContent from './sidebar/ShapeContent';
import UploadContent from './sidebar/UploadContent';
import GraphicContent from './sidebar/GraphicContent';

const tabs = [
    {
        name: 'Text',
        icon: <TextTIcon />,
    },
    {
        name: 'Shape',
        icon: <SquareIcon />,
    },
    {
        name: 'Stickers',
        icon: <PiggyBankIcon />,
    },
    {
        name: 'Upload',
        icon: <UploadIcon />,
    },
];
const Sidebar = () => {
    const { actions } = useEditor();
    const [tab, setTab] = useState(null);
    return (
        <div
            style={{
                display: 'flex',
                zIndex: 2,
                position: 'relative',
                backgroundColor: '#ffffff',
                borderRight: '1px solid rgba(217, 219, 228, 0.6)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                }}
            >
                <SidebarTab
                    tabs={tabs}
                    active={tab}
                    onChange={(_, tab) => {
                        actions.setSidebar();
                        setTab(tab);
                    }}
                />
                {tab && (
                    <div
                        style={{
                            width: 360,
                            '@media (max-width: 900px)': {
                                width: '100%',
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                top: 0,
                                background: '#fff',
                            },
                        }}
                    >
                        {tab === 'Text' && (
                            <TextContent
                                onClose={() => {
                                    setTab(null);
                                    actions.setSidebar();
                                }}
                            />
                        )}
                        {tab === 'Stickers' && (
                            <GraphicContent
                                onClose={() => {
                                    setTab(null);
                                    actions.setSidebar();
                                }}
                            />
                        )}
                        {tab === 'Shape' && (
                            <ShapeContent
                                onClose={() => {
                                    setTab(null);
                                    actions.setSidebar();
                                }}
                            />
                        )}
                        <UploadContent
                            visibility={tab === 'Upload'}
                            onClose={() => {
                                setTab(null);
                                actions.setSidebar();
                            }}
                        />
                    </div>
                )}
            </div>
            <div
                style={{
                    width: 360,
                    position: 'absolute',
                    overflow: 'hidden',
                    top: 0,
                    left: 73,
                    height: '100%',
                    pointerEvents: 'none',
                }}
                id={'settings'}
            />
        </div>
    );
};

export default Sidebar;
