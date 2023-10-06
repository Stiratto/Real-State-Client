const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
    } catch (err) {
      console.log("Could not sign in with google", err);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    >
      Sign in with google
    </button>
  );
};

export default OAuth;
