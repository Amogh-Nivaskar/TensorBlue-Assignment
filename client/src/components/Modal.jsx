function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 ">
      {children}
    </div>
  );
}

export default Modal;
