import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  //CONSTANTES
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleToUpdate, setTitleToUpdate] = useState("");
  const [contentToUpdate, setContentToUpdate] = useState("");
  const [defaultId, setDefaultId] = useState("");
  const [defaultIdToUpdate, setDefaultIdToUpdate] = useState("");
  const [defaultIdToDelete, setDefaultIdToDelete] = useState("");
  const loginForm = AuthShowcase();

  //CRUD
  const fetchAllItems = api.example.getAll.useQuery();
  const fetchOneItem = api.example.getItem.useQuery({ id: defaultId})
  const putItemMutation = api.example.putItem.useMutation();
  const updateItemMutation = api.example.updItem.useMutation();
  const deleteItemMutation = api.example.delItem.useMutation();

  //HANDLERS
  const handlePutItem =async () => {
    try {
      await putItemMutation.mutateAsync({
        title: title,
        content: content,
      });
      setTitle("");
      setContent("");
      fetchAllItems.refetch();
    } catch (e) {
      console.log(e);
    }
  }
  const handleUpdItem = async () => {
    try {
      await updateItemMutation.mutateAsync({
        id: defaultIdToUpdate,
        title: titleToUpdate,
        content: contentToUpdate,
      });
      setTitleToUpdate("");
      setContentToUpdate("");
      setDefaultIdToUpdate("");
      fetchAllItems.refetch();
    } catch (e) {
      console.log(e);
    }
  }
  const handleDelItem = async () => {
    try {
      await deleteItemMutation.mutateAsync({
        id: defaultIdToDelete,
      });
    } catch (e) {
      console.log(e);
    }
  }

  //UI
  return (
  <div className="mx-auto p-8">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Scan DB</h2>
      </div>
      <button
        className="rounded bg-black px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => fetchAllItems.refetch()}
      >
        Scan
      </button>

      <div className="text- mb-4 mt-4 grid grid-cols-3 gap-4 font-bold">
        <p>Id</p>
        <p>Title</p>
        <p>Content</p>
      </div>

      {fetchAllItems.data &&
        fetchAllItems.data.map((item) => (
          <div
            key={item.id}
            className="my-4 grid grid-cols-3 gap-4 rounded border border-gray-300 bg-white p-4 shadow"
          >
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.content}</p>
          </div>
        ))}

      {/* Get one user UI */}

      <div className="mb-8 bg-blue-500 rounded">
        <h2 className="mb-4 text-2xl font-bold">Get One Item</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2 rounded"
            placeholder="Enter item id there"
            value={defaultId || ""}
            onChange={(e) => setDefaultId(String(e.target.value))}
          />
          <button
            className="rounded bg-black px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => fetchOneItem.refetch()}
          >
            Get One Item
          </button>
        </div>
        {fetchOneItem.data && (
          <div>
            <p>Title: {fetchOneItem.data.title}</p>
            <p>Content: {fetchOneItem.data.content}</p>
          </div>
        )}
      </div>

      {/* Create Item */}
      <div className="mb-8 bg-green-500 rounded">
        <h2 className="mb-4 text-2xl font-bold">Create New Item</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2 rounded"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          className="rounded bg-black px-4 py-2 text-white hover:bg-green-600"
          onClick={handlePutItem}
        >
          Create Item
        </button>
      </div>

      {/* Update User */}
      <div className="mb-8 bg-orange-500 rounded">
        <h2 className="mb-4 text-2xl font-bold">Update Item</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded"
            placeholder="Title to update"
            value={titleToUpdate}
            onChange={(e) => setTitleToUpdate(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2 rounded"
            placeholder="Content to update"
            value={contentToUpdate}
            onChange={(e) => setContentToUpdate(e.target.value)}
          />
        </div>
        <input
          placeholder="Enter item id to update"
          className="mr-2 border border-gray-300 p-2 rounded"
          value={defaultIdToUpdate}
          onChange={(e) => setDefaultIdToUpdate(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-black px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdItem}
        >
          Update User
        </button>
      </div>

      {/* Delete User */}

      <div className="mb-8 bg-red-600 rounded">
        <h2 className="mb-4 text-2xl font-bold">Delete Item</h2>
        <input
          placeholder="Enter item id to delete"
          className="mr-2 border border-gray-300 p-2 rounded"
          value={defaultIdToDelete}
          onChange={(e) => setDefaultIdToDelete(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-black px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDelItem}
        >
          Delete Item
        </button>
      </div>
      {loginForm}
    </div>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}