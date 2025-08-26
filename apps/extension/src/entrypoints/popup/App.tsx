function App() {
	return (
		<div className="min-w-96 p-6">
			<h1 className="text-2xl font-bold mb-4">Prompt Enhancer</h1>
			<p className="text-gray-600 mb-4">
				This extension adds a prompt enhancer button to ChatGPT's interface.
			</p>
			<div className="bg-blue-50 p-4 rounded-lg">
				<h2 className="font-semibold mb-2">How to use:</h2>
				<ol className="list-decimal list-inside space-y-1 text-sm">
					<li>Go to ChatGPT (chatgpt.com)</li>
					<li>Type your prompt in the input field</li>
					<li>Click the enhancer button (+ with circle icon)</li>
					<li>Your prompt will be enhanced</li>
				</ol>
			</div>
		</div>
	);
}

export default App;

// <RoleCard
// 	key={card.description}
// 	title={card.title}
// 	description={card.description}
// 	author={card.author}
// />
