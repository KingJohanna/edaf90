1)
There is a difference between class and function components. 
Class components are more verbose but have a state object which might be useful.
Nowadays, we can modify state in function components by using hooks.

2)
If the render function depends on data that changes over time we might
unnecessarily re-render many times. Any data that changes over time should
be handled by state or the useEffect hook.

3)
Yes, by using the useMemo hook

4)
The DOM is updated when state or props changes. A virtual DOM keeps track of
the changes and the real DOM is only updated (with the necessary changes) if there's a difference. 

5)
Not necessarily, only if we handle the form event and update the state.

6) 
"this" refers to the instance of the component at hand. However, when you pass a callback function as a prop or an event handler, 
the value of "this" will be undefined or will refer to the global object unless you bind "this" to the component instance.

7)
The spread operator creates a shallow copy, so the prototype chain does not change. The copy is a new object with a 
different prototype chain.

