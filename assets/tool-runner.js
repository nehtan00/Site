document.addEventListener('DOMContentLoaded', () => {
  const toolRunner = document.querySelector('.tool-runner');
  if (!toolRunner) {
    return; // Do nothing if not on a tool page
  }

  const toolHandle = toolRunner.dataset.toolHandle;
  const sectionId = toolRunner.dataset.sectionId;

  const inputEl = document.getElementById(`ToolInput-${sectionId}`);
  const outputEl = document.getElementById(`ToolOutput-${sectionId}`);
  const runButton = document.getElementById(`RunToolButton-${sectionId}`);

  // --- MOCK API & TOOL LOGIC ---
  // This is where you define the behavior for each tool.
  // In a real application, the `run` function would make a `fetch` call
  // to your backend API.

  const toolLogics = {
    // Example for a page with handle 'simile'
    'simile': {
      run: async (text) => {
        if (!text) return 'Please enter some text to create a simile.';
        // **REAL-WORLD**: Replace this with an API call
        // const response = await fetch('https://your-api.com/simile', {
        //   method: 'POST',
        //   body: JSON.stringify({ text: text })
        // });
        // const data = await response.json();
        // return data.result;
        
        // **PLACEHOLDER LOGIC**:
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        return `The text is like a placeholder, waiting for a real API.`;
      }
    },
    // Example for a page with handle 'explode'
    'explode': {
      run: async (text) => {
        if (!text) return 'Please enter some text to explode.';
        await new Promise(resolve => setTimeout(resolve, 500));
        return text.toUpperCase().split('').join(' ');
      }
    },
    // Example for a page with handle 'unfold'
    'unfold': {
      run: async (text) => {
        if (!text) return 'Please enter some text to unfold.';
        await new Promise(resolve => setTimeout(resolve, 500));
        return text.split(' ').join('\n');
      }
    },
    // Add other tools here...
    'default': {
        run: async (text) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return `No specific logic found for tool "${toolHandle}". This is the default response. Input was: "${text}"`;
        }
    }
  };

  // --- EVENT HANDLING ---

  const handleRun = async () => {
    const inputText = inputEl.value.trim();
    
    // Disable button and show loading state
    runButton.disabled = true;
    runButton.textContent = 'Running...';
    outputEl.textContent = '';
    outputEl.classList.add('loading');
    
    // Find the correct logic for the current tool, or use default
    const logic = toolLogics[toolHandle] || toolLogics.default;

    try {
      // Execute the run function
      const result = await logic.run(inputText);
      outputEl.textContent = result;
    } catch (error) {
      console.error('Error running tool:', error);
      outputEl.textContent = 'An error occurred. Please try again.';
    } finally {
      // Re-enable button and remove loading state
      runButton.disabled = false;
      runButton.textContent = 'Run';
      outputEl.classList.remove('loading');
    }
  };

  if(runButton) {
    runButton.addEventListener('click', handleRun);
  }
});