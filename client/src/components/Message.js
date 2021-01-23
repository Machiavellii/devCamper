import React, { useState, useEffect } from "react";

const Message = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? (
    <div className={`alert alert-${props.variant}`} role="alert">
      {props.children}
    </div>
  ) : (
    <></>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
