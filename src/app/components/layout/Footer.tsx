export default function Footer() {
  return (
    <footer className="border-t border-pixel-edges bg-indigo-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 text-center md:grid-cols-2 md:text-left">
          {/* Attribution */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400">
              Made with 💻 by Ammar Ateya
            </h3>
            <p className="mt-2 text-indigo-200">
              Questions or suggestions? Email{" "}
              <a
                href="mailto:ammarat@umich.edu"
                className="text-yellow-400 hover:underline"
              >
                ammarat@umich.edu
              </a>
            </p>
          </div>

          {/* Honor Code */}
          <div>
            <h3 className="text-lg font-bold text-yellow-400">Honor Code</h3>
            <p className="mt-2 text-indigo-200">
              These cheat sheets are meant to be used as study aids and quick
              references. Please follow the{" "}
              <a
                href="https://ecas.engin.umich.edu/honor-council/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                UMich Engineering Honor Code
              </a>{" "}
              and course policies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
