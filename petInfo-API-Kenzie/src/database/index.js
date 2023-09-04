const { createPost } = require('../services/post.services');
const {createUser} = require ('./../services/user.services');

const users = [
    {
        username: "Rafael Bertoldo",
        email: "rafael@mail.com",
        password: "123456",
        avatar: "https://imgs.search.brave.com/dmNsyBvLmS4jetkOvFsxVmpaniEqqxT8BaNBAI-_7jM/rs:fit:416:416:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L2ljb24tb2YtYS1i/dXNpbmVzc21hbi1h/dmF0YXItb3ItcHJv/ZmlsZS1waWMtcGlj/dHVyZS1pZDQ3NDAw/MTg5Mj9rPTYmbT00/NzQwMDE4OTImcz0x/NzA2NjdhJnc9MCZo/PWF0cVpzV0YtVWNM/QkQ1dTJCTVpqcE11/cjZKOW56aVFyclBh/aXFaaDU3S1k9"
    },
    {
        username: "Camila Lima",
        email: "camilaLima_default@mail.com",
        password: "123456",
        avatar: "https://imgs.search.brave.com/dmNsyBvLmS4jetkOvFsxVmpaniEqqxT8BaNBAI-_7jM/rs:fit:416:416:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L2ljb24tb2YtYS1i/dXNpbmVzc21hbi1h/dmF0YXItb3ItcHJv/ZmlsZS1waWMtcGlj/dHVyZS1pZDQ3NDAw/MTg5Mj9rPTYmbT00/NzQwMDE4OTImcz0x/NzA2NjdhJnc9MCZo/PWF0cVpzV0YtVWNM/QkQ1dTJCTVpqcE11/cjZKOW56aVFyclBh/aXFaaDU3S1k9"
    },
    {
        username: "Patrícia Oliveira",
        email: "patriciaOliveira_default",
        password: "123456",
        avatar: "https://imgs.search.brave.com/dmNsyBvLmS4jetkOvFsxVmpaniEqqxT8BaNBAI-_7jM/rs:fit:416:416:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L2ljb24tb2YtYS1i/dXNpbmVzc21hbi1h/dmF0YXItb3ItcHJv/ZmlsZS1waWMtcGlj/dHVyZS1pZDQ3NDAw/MTg5Mj9rPTYmbT00/NzQwMDE4OTImcz0x/NzA2NjdhJnc9MCZo/PWF0cVpzV0YtVWNM/QkQ1dTJCTVpqcE11/cjZKOW56aVFyclBh/aXFaaDU3S1k9"
    }
]


async function populate() {
    const usersDb = []
    users.forEach(async (user) => {
        const newUser = await createUser(user)
        usersDb.push(newUser)
        console.log(`usuário ${user.username} criado com sucesso`)
    })

    setTimeout(async () => {
       await createPost({
        title: "Outubro Rosa: Detalhes sobre a importância da prevenção do cancêr de mama em cadelas e gatas",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nec ex eu sodales. Integer sit amet nunc et leo venenatis convallis. Etiam a sapien risus. Pellentesque non felis congue, consectetur leo a, varius enim. Cras sagittis mollis purus. Donec quis dictum mi. Mauris ultricies sed tortor et pellentesque. Etiam non sapien ut eros ultrices pharetra. Nulla facilisi.;;Etiam molestie nisi vel ipsum fringilla, nec mollis nisl finibus. Suspendisse sed ultricies libero. Vivamus pulvinar egestas risus vel aliquet. Praesent ultricies dui eu lectus hendrerit, ac bibendum libero lobortis. Cras a iaculis orci. In hac habitasse platea dictumst. Fusce pellentesque enim ac vestibulum fermentum. Sed vulputate, ante rhoncus venenatis pharetra, eros felis accumsan tellus, et laoreet lacus lacus non nisi. Aenean pulvinar dui ex, non dictum lorem auctor quis. Morbi mauris dolor, tempus quis placerat nec, aliquam at neque. Etiam sit amet leo vitae mi ornare aliquet vehicula cursus libero. Morbi iaculis augue ultrices accumsan accumsan.`
    }, usersDb[0].id)
    console.log(`post 1 criado com sucesso`)

    await createPost({
        title: "Você sabia que os pets também podem doar sangue?",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nec ex eu sodales. Integer sit amet nunc et leo venenatis convallis. Etiam a sapien risus. Pellentesque non felis congue, consectetur leo a, varius enim. Cras sagittis mollis purus. Donec quis dictum mi. Mauris ultricies sed tortor et pellentesque. Etiam non sapien ut eros ultrices pharetra. Nulla facilisi.;;Etiam molestie nisi vel ipsum fringilla, nec mollis nisl finibus. Suspendisse sed ultricies libero. Vivamus pulvinar egestas risus vel aliquet. Praesent ultricies dui eu lectus hendrerit, ac bibendum libero lobortis. Cras a iaculis orci. In hac habitasse platea dictumst. Fusce pellentesque enim ac vestibulum fermentum. Sed vulputate, ante rhoncus venenatis pharetra, eros felis accumsan tellus, et laoreet lacus lacus non nisi. Aenean pulvinar dui ex, non dictum lorem auctor quis. Morbi mauris dolor, tempus quis placerat nec, aliquam at neque. Etiam sit amet leo vitae mi ornare aliquet vehicula cursus libero. Morbi iaculis augue ultrices accumsan accumsan.`
    }, usersDb[1].id)

    console.log(`post 2 criado com sucesso`)


    await createPost({
        title: "Quando levar o pet ao médico-veterinário?",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nec ex eu sodales. Integer sit amet nunc et leo venenatis convallis. Etiam a sapien risus. Pellentesque non felis congue, consectetur leo a, varius enim. Cras sagittis mollis purus. Donec quis dictum mi. Mauris ultricies sed tortor et pellentesque. Etiam non sapien ut eros ultrices pharetra. Nulla facilisi.;;Etiam molestie nisi vel ipsum fringilla, nec mollis nisl finibus. Suspendisse sed ultricies libero. Vivamus pulvinar egestas risus vel aliquet. Praesent ultricies dui eu lectus hendrerit, ac bibendum libero lobortis. Cras a iaculis orci. In hac habitasse platea dictumst. Fusce pellentesque enim ac vestibulum fermentum. Sed vulputate, ante rhoncus venenatis pharetra, eros felis accumsan tellus, et laoreet lacus lacus non nisi. Aenean pulvinar dui ex, non dictum lorem auctor quis. Morbi mauris dolor, tempus quis placerat nec, aliquam at neque. Etiam sit amet leo vitae mi ornare aliquet vehicula cursus libero. Morbi iaculis augue ultrices accumsan accumsan.`
    }, usersDb[0].id)

    console.log(`post 3 criado com sucesso`)


    await createPost({
        title: "Qual a diferença entre alimentação natural para humanos e alimentação natural para pets?",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nec ex eu sodales. Integer sit amet nunc et leo venenatis convallis. Etiam a sapien risus. Pellentesque non felis congue, consectetur leo a, varius enim. Cras sagittis mollis purus. Donec quis dictum mi. Mauris ultricies sed tortor et pellentesque. Etiam non sapien ut eros ultrices pharetra. Nulla facilisi.;;Etiam molestie nisi vel ipsum fringilla, nec mollis nisl finibus. Suspendisse sed ultricies libero. Vivamus pulvinar egestas risus vel aliquet. Praesent ultricies dui eu lectus hendrerit, ac bibendum libero lobortis. Cras a iaculis orci. In hac habitasse platea dictumst. Fusce pellentesque enim ac vestibulum fermentum. Sed vulputate, ante rhoncus venenatis pharetra, eros felis accumsan tellus, et laoreet lacus lacus non nisi. Aenean pulvinar dui ex, non dictum lorem auctor quis. Morbi mauris dolor, tempus quis placerat nec, aliquam at neque. Etiam sit amet leo vitae mi ornare aliquet vehicula cursus libero. Morbi iaculis augue ultrices accumsan accumsan.`        
    }, usersDb[2].id)
        
    console.log(`post 4 criado com sucesso`)

    }, 3000);
}

populate()