import { useDropzone } from "react-dropzone";

// const MyDropzone = () => {
//   const onDrop = useCallback((acceptedFiles) => {
//     <input
//       type="file"
//       placeholder="Ajoute une photo"
//       name="picture-upload"
//       id="picture-upload"
//       required
//       onChange={(event) => {
//         setPicture(event.target.files[0]);
//       }}
//     />;
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="picture-upload" {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// };

const MyDropzone = ({ open }) => {
  const { getRootProps, getInputProps } = useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="class-center">
        <p className="dropzone-content">
          Drag'n'drop some files here, or click to select files
        </p>
      </div>
    </div>
  );
};

export default MyDropzone;
