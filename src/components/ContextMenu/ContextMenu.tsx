import React, { Component } from "react";
import { connect } from "react-redux";
import "./ContextMenu.css";
import Menu from '@mui/material/Menu';


import RenameAction from "./ContextMenuActions/RenameAction.jsx";
import { getActionsByMultipleFiles } from "../../utils/data.js";

class ContextMenu extends Component {
  render() {
    const { acts, visible, x, y } = this.props;
    const actionsComp = acts.map((act, key) => {
      let component;

      if (act === "rename") {
        component = <RenameAction key={key} />;
      }
      return component;
    });

    return (
      <div>
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={{ top: y, left: x }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={visible}
          onClose={() => {}}
          PaperProps={{ style: { width: 170 } }}
        >
          {actionsComp}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    x: 0,
    y: 0,
    visible: !!state.contextMenuVisible,
    // acts: getActionsByMultipleFiles(state.selectedFiles),
    acts: getActionsByMultipleFiles([]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
