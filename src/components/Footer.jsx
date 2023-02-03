const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-center text-white mt-5">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a className="btn btn-outline-secondary btn-floating m-1" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a className="btn btn-outline-secondary btn-floating m-1" role="button">
              <i className="fab fa-twitter"></i>
            </a>

            <a className="btn btn-outline-secondary btn-floating m-1" role="button">
              <i className="fab fa-google"></i>
            </a>

            <a className="btn btn-outline-secondary btn-floating m-1" role="button">
              <i className="fab fa-instagram"></i>
            </a>

            <a className="btn btn-outline-secondary btn-floating m-1" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a className="btn btn-outline-secondary btn-floating m-1" role="button">
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <p>© 2020 Copyright: bookify</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
