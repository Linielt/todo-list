export const openSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "400px";
}

export const closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "0";
}