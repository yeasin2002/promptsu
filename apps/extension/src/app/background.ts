export default defineBackground(() => {
	console.log("Hello background!", { id: browser.runtime.id });

	browser.runtime.setUninstallURL("http://yeasin2002.vercel.app");
});
