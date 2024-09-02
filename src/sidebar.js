export const openSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "20%";
}

export const closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "0";
}