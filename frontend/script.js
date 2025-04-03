document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById("preview");
        preview.src = URL.createObjectURL(file);
        preview.classList.remove("hidden");
        document.getElementById("error").classList.add("hidden");
    }
});

async function uploadImage() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById("error").innerText = "Please select an image first.";
        document.getElementById("error").classList.remove("hidden");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:8000/predict/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to upload image.");
        }

        const data = await response.json();
        document.getElementById("className").innerText = data.class_name;
        document.getElementById("probability").innerText = (data.probability * 100).toFixed(2);
        document.getElementById("result").classList.remove("hidden");
    } catch (error) {
        document.getElementById("error").innerText = error.message;
        document.getElementById("error").classList.remove("hidden");
    }
}
