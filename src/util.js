//should resolve a way to make this able to create and append multiples, or to create and append to itself while being created?

// so far, it's a less useful, 99% less functional jquery.
const createAndAppend = ({
  el,
  parent = null,
  children = null,
  className = null,
  id = null,
  content = null,
  attr = null,
  type = null,
  name = null,
  htmlFor = null
}) => {
  let element = document.createElement(el);
  if (className) element.classList.add(...className.split(' '));
  if (id) element.id = id;
  if (content) element.innerHTML = content;
  if (attr) element.setAttribute(attr.text, attr.content);
  if (type) element.type = type;
  if (name) element.name = name;
  if (htmlFor) element.htmlFor = htmlFor;
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        element.appendChild(child);
      });
    } else {
      element.appendChild(children);
    }
  }
  if (parent) parent.appendChild(element);
  return element;
};

export { createAndAppend };
