import React, { useState } from 'react';
import './App.css';

const TagView = ({ node, updateTree }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleEditing = () => setEditing(!editing);

  const addChild = () => {
    if (node.data) {
      delete node.data;
    }
    if (!node.children) {
      node.children = [];
    }
    node.children.push({ name: 'New Child', data: 'Data' });
    updateTree();
  };

  const updateData = (e) => {
    node.data = e.target.value;
    updateTree();
  };

  const updateName = (e) => {
    node.name = e.target.value;
    updateTree();
  };

  return (
    <div className="tag">
      <div className="tag-header">
        <button onClick={toggleCollapse}>{collapsed ? '>' : 'v'}</button>
        {editing ? (
          <input type="text" value={node.name} onChange={updateName} onBlur={toggleEditing} />
        ) : (
          <span onClick={toggleEditing}>{node.name}</span>
        )}
        <button onClick={addChild}>Add Child</button>
      </div>
      {!collapsed && (
        <div className="tag-content">
          {node.children ? (
            node.children.map((child, index) => (
              <TagView key={index} node={child} updateTree={updateTree} />
            ))
          ) : (
            <div className="data-container">
              <span>Data: </span>
              <input type="text" value={node.data} onChange={updateData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [tree, setTree] = useState({
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' },
        ],
      },
      { name: 'child2', data: 'c2 World' },
    ],
  });

  const [exportedData, setExportedData] = useState(null);

  const updateTree = () => {
    setTree({ ...tree });
  };

  const exportTree = () => {
    const exportedString = JSON.stringify(tree, ['name', 'children', 'data'], 2);
    setExportedData(exportedString);
  };

  return (
    <div className="App">
      <h1>Frontend Assignment</h1>
      <TagView node={tree} updateTree={updateTree} />
      <button className="export-button" onClick={exportTree}>Export</button>
      {exportedData && (
        <div className="export-box">
          <pre>{exportedData}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
