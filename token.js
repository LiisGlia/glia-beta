const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		});
const idToken = params.idtoken;
window.getGliaContext = () => ({ idToken });