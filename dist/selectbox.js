class SelectBox {
    #elements
    constructor() {
        this.#elements = document.querySelectorAll("[data-selectbox]")
        this.#init()
    }

    #init() {
        this.#elements.forEach(element => {
            const wrapper = document.createElement("div")
            wrapper.classList.add("selectbox-wrapper")
            wrapper.dataset.name = element.getAttribute("name")

            element.parentNode.insertBefore(wrapper, element)
            wrapper.appendChild(element)
            const label = document.createElement("label")
            label.classList.add("selectbox-label")
            label.innerHTML = element.options[0].innerHTML
            wrapper.appendChild(label)
            wrapper.appendChild(this.#createList(element, wrapper))

            label.addEventListener("click", () => {
                wrapper.classList.toggle("open")
                requestAnimationFrame(() => {
                    wrapper.querySelector("ul").classList.toggle("show")
                })
            })

            document.addEventListener("click", e => {
                if (e.target.closest(".selectbox-wrapper") === wrapper) return
                wrapper.classList.remove("open")
                wrapper.querySelector("ul").classList.remove("show")
            })
        })
    }

    #createList(select, wrapper) {
        const list = document.createElement("ul")
        list.setAttribute("tabindex", 1)
        list.classList.add("selectbox-list")
        select.querySelectorAll("option").forEach(option => {
            const item = document.createElement("li")
            item.classList.add("selectbox-item")
            item.dataset.value = option.value
            item.ariaLabel = option.innerHTML
            item.innerHTML = option.innerHTML
            list.appendChild(item)
            list.addEventListener("click", e => {
                if (e.target.tagName !== "LI") return
                select.value = e.target.dataset.value
                select.dispatchEvent(new Event("change"))
                wrapper.querySelector(".selectbox-label").innerHTML = e.target.innerHTML
                list.classList.remove("show")
                wrapper.classList.remove("open")
            })
        })
        return list
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    new SelectBox()
})
