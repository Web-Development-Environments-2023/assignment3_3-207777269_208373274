<template>
    <div class="main-container">
        <p class="paragraph">Welcome to 'Grandma's Recipes and Beyond', a unique full-stack web development project created as part of our Web Development Programming course at the university. Our platform serves as a dynamic recipe hub where you can discover and track the preparation of diverse dishes. It also offers a personal space for each user to preserve their family recipes, keeping treasured culinary traditions alive and organized in one accessible location. Designed with consideration for security, performance, and storage, the project exhibits our dedication to implementing the principles taught in the course.</p>
        <h1 class="title">About Us</h1>
        <div class="profiles">
            <div class="profile">
                <h2 class="subtitle">Amit Kravchik</h2>
                <div class="social-icons">
                    <a href="https://www.linkedin.com/in/amit-kravchik-45289318b" target="_blank">
                        <img src="../assets/linkedin-icon.png" alt="Yuval Schwartz LinkedIn" width="28">
                    </a>
                    <a href="https://github.com/AmitKravchik" target="_blank">
                        <img src="../assets/github-icon.png" alt="Amit Kravchik Github" width="30">
                    </a>
                </div>
                <img src="../assets/Amit Kravchik.jpg" class="rounded-circle" alt="Amit Kravchik" width="170">
                <div class="project-container">
                    <h3 class="subtitle subsubtitle">First Project:</h3>
                    <div class="project-icons">
                        <a href="https://web-development-environments-2023.github.io/207777269/" target="_blank">
                            <img src="../assets/website-icon.png" alt="Amit Kravchik First Project Website" width="30">
                        </a>
                        <a href="https://github.com/Web-Development-Environments-2023/207777269" target="_blank">
                            <img src="../assets/github-icon.png" alt="Amit Kravchik First Project Github" width="28">
                        </a>
                    </div>
                </div>
            </div>
            <div class="profile">
                <h2 class="subtitle">Yuval Schwartz</h2>
                <div class="social-icons">
                    <a href="https://www.linkedin.com/in/yuval-schwartz/" target="_blank">
                        <img src="../assets/linkedin-icon.png" alt="Yuval Schwartz LinkedIn" width="28">
                    </a>
                    <a href="https://github.com/YuvalSchwartz" target="_blank">
                        <img src="../assets/github-icon.png" alt="Yuval Schwartz Github" width="30">
                    </a>
                </div>
                <img src="../assets/Yuval Schwartz.jpg" class="rounded-circle" alt="Yuval Schwartz" width="170">
                <div class="project-container">
                    <h3 class="subtitle subsubtitle">First Project:</h3>
                    <div class="project-icons">
                        <a href="https://web-development-environments-2023.github.io/208373274/" target="_blank">
                            <img src="../assets/website-icon.png" alt="Yuval Schwartz First Project Website" width="30">
                        </a>
                        <a href="https://github.com/Web-Development-Environments-2023/208373274" target="_blank">
                            <img src="../assets/github-icon.png" alt="Yuval Schwartz First Project Github" width="28">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="project-container">
            <h3 class="subtitle subsubtitle">Second Project:</h3>
            <div class="project-icons">
                <a href="https://web-development-environments-2023.github.io/assignment2-208373274_207777269/" target="_blank">
                    <img src="../assets/website-icon.png" alt="Yuval Schwartz And Amit Kravchik Second Project Website" width="30">
                </a>
                <a href="https://github.com/Web-Development-Environments-2023/assignment2-208373274_207777269" target="_blank">
                    <img src="../assets/github-icon.png" alt="Yuval Schwartz And Amit Kravchik Second Project Github" width="28">
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Frank Ruhl Libre, Georgia, serif;
        padding-bottom: 3%;
        .paragraph {
            text-align: center;
            font-size: 24px;
            padding-top: 3%;
            padding-right: 5%;
            padding-left: 5%;
        }
        .title {
            font-size: 65px;
            padding-top: 2%;
            padding-bottom: 40px;
        }
        .profiles {
            display: flex;
            justify-content: center;
            gap: 100px;
            padding-bottom: 20px;
            .profile {
                display: flex;
                flex-direction: column;
                align-items: center;
                .subtitle {
                    font-size: 28px;
                }
                .social-icons {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 8px;
                    a {
                        transition: transform 0.15s ease-in-out;
                        &:hover {
                            transform: scale(1.3);
                        }
                    }
                }
                .subsubtitle {
                    margin-top: 10px;
                    font-size: 20px;
                }
                .project-container {
                    display: flex;
                    gap: 10px; 
                    align-items: center;
                }
                .project-icons {
                    display: flex;
                    gap: 10px;
                    a {
                        transition: transform 0.15s ease-in-out;
                        &:hover {
                            transform: scale(1.3);
                        }
                    }
                }
            }
        }
        .project-container {
            display: flex;
            gap: 10px;
            align-items: center;
            padding-top: 10px;
        }
        .project-icons {
            display: flex;
            gap: 10px;
            a {
                transition: transform 0.15s ease-in-out;
                &:hover {
                    transform: scale(1.3);
                }
            }
        }
    }
</style>