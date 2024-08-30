-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 31-Ago-2024 às 01:28
-- Versão do servidor: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creche`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE `aluno` (
  `codigo` int(5) NOT NULL,
  `codresponsavel` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `alunoturma`
--

CREATE TABLE `alunoturma` (
  `codigo` int(5) NOT NULL,
  `codaluno` int(5) NOT NULL,
  `codturma` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividades`
--

CREATE TABLE `atividades` (
  `codigo` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `descricao` text NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `auxiliar`
--

CREATE TABLE `auxiliar` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `avisos`
--

CREATE TABLE `avisos` (
  `codigo` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `descricao` text NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamada`
--

CREATE TABLE `chamada` (
  `codigo` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `codaluno` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `presenca` varchar(50) NOT NULL,
  `observacao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `colaborador`
--

CREATE TABLE `colaborador` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `fotos`
--

CREATE TABLE `fotos` (
  `codigo` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `descricao` text NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `horario`
--

CREATE TABLE `horario` (
  `codigo` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `informacoesadicionais`
--

CREATE TABLE `informacoesadicionais` (
  `codigo` int(5) NOT NULL,
  `codaluno` int(5) NOT NULL,
  `alergia` varchar(50) NOT NULL,
  `restricaoalimentar` varchar(50) NOT NULL,
  `doenca` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `meudiamanha`
--

CREATE TABLE `meudiamanha` (
  `codigo` int(5) NOT NULL,
  `codaluno` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `codprofessor` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `recado` text NOT NULL,
  `xixi` varchar(50) NOT NULL,
  `coco` varchar(50) NOT NULL,
  `sono` varchar(50) NOT NULL,
  `saude` varchar(50) NOT NULL,
  `medicacao` varchar(100) NOT NULL,
  `cafemanha` varchar(50) NOT NULL,
  `almoco` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `meudiatarde`
--

CREATE TABLE `meudiatarde` (
  `codigo` int(5) NOT NULL,
  `codaluno` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `codprofessor` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `recado` text NOT NULL,
  `xixi` varchar(50) NOT NULL,
  `coco` varchar(50) NOT NULL,
  `sono` varchar(50) NOT NULL,
  `saude` varchar(50) NOT NULL,
  `medicacao` varchar(100) NOT NULL,
  `cafetarde` varchar(50) NOT NULL,
  `janta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE `professor` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `professorturma`
--

CREATE TABLE `professorturma` (
  `codigo` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `codprofessor` int(5) NOT NULL,
  `codauxiliar` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `responsavel`
--

CREATE TABLE `responsavel` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `nomeautorizado1` varchar(50) NOT NULL,
  `telefoneautorizado1` varchar(50) NOT NULL,
  `nomeautorizado2` varchar(50) NOT NULL,
  `telefoneautorizado2` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE `turma` (
  `codigo` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `sala` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codresponsavel` (`codresponsavel`);

--
-- Indexes for table `alunoturma`
--
ALTER TABLE `alunoturma`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codaluno` (`codaluno`),
  ADD KEY `codturma` (`codturma`);

--
-- Indexes for table `atividades`
--
ALTER TABLE `atividades`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codturma` (`codturma`);

--
-- Indexes for table `auxiliar`
--
ALTER TABLE `auxiliar`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `avisos`
--
ALTER TABLE `avisos`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codturma` (`codturma`);

--
-- Indexes for table `chamada`
--
ALTER TABLE `chamada`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codturma` (`codturma`),
  ADD KEY `codaluno` (`codaluno`);

--
-- Indexes for table `colaborador`
--
ALTER TABLE `colaborador`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codturma` (`codturma`);

--
-- Indexes for table `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codturma` (`codturma`);

--
-- Indexes for table `informacoesadicionais`
--
ALTER TABLE `informacoesadicionais`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codaluno` (`codaluno`);

--
-- Indexes for table `meudiamanha`
--
ALTER TABLE `meudiamanha`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codaluno` (`codaluno`),
  ADD KEY `codturma` (`codturma`),
  ADD KEY `codprofessor` (`codprofessor`);

--
-- Indexes for table `meudiatarde`
--
ALTER TABLE `meudiatarde`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codaluno` (`codaluno`),
  ADD KEY `codturma` (`codturma`),
  ADD KEY `codprofessor` (`codprofessor`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `professorturma`
--
ALTER TABLE `professorturma`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codturma` (`codturma`),
  ADD KEY `codprofessor` (`codprofessor`),
  ADD KEY `codauxiliar` (`codauxiliar`);

--
-- Indexes for table `responsavel`
--
ALTER TABLE `responsavel`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aluno`
--
ALTER TABLE `aluno`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alunoturma`
--
ALTER TABLE `alunoturma`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `atividades`
--
ALTER TABLE `atividades`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `auxiliar`
--
ALTER TABLE `auxiliar`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `avisos`
--
ALTER TABLE `avisos`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chamada`
--
ALTER TABLE `chamada`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `colaborador`
--
ALTER TABLE `colaborador`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fotos`
--
ALTER TABLE `fotos`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `horario`
--
ALTER TABLE `horario`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `informacoesadicionais`
--
ALTER TABLE `informacoesadicionais`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `meudiamanha`
--
ALTER TABLE `meudiamanha`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `meudiatarde`
--
ALTER TABLE `meudiatarde`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `professorturma`
--
ALTER TABLE `professorturma`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `responsavel`
--
ALTER TABLE `responsavel`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `turma`
--
ALTER TABLE `turma`
  MODIFY `codigo` int(5) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`codresponsavel`) REFERENCES `responsavel` (`codigo`);

--
-- Limitadores para a tabela `alunoturma`
--
ALTER TABLE `alunoturma`
  ADD CONSTRAINT `alunoturma_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`),
  ADD CONSTRAINT `alunoturma_ibfk_2` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Limitadores para a tabela `atividades`
--
ALTER TABLE `atividades`
  ADD CONSTRAINT `atividades_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Limitadores para a tabela `avisos`
--
ALTER TABLE `avisos`
  ADD CONSTRAINT `avisos_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Limitadores para a tabela `chamada`
--
ALTER TABLE `chamada`
  ADD CONSTRAINT `chamada_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `chamada_ibfk_2` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`);

--
-- Limitadores para a tabela `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Limitadores para a tabela `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Limitadores para a tabela `informacoesadicionais`
--
ALTER TABLE `informacoesadicionais`
  ADD CONSTRAINT `informacoesadicionais_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`);

--
-- Limitadores para a tabela `meudiamanha`
--
ALTER TABLE `meudiamanha`
  ADD CONSTRAINT `meudiamanha_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`),
  ADD CONSTRAINT `meudiamanha_ibfk_2` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `meudiamanha_ibfk_3` FOREIGN KEY (`codprofessor`) REFERENCES `professor` (`codigo`);

--
-- Limitadores para a tabela `meudiatarde`
--
ALTER TABLE `meudiatarde`
  ADD CONSTRAINT `meudiatarde_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`),
  ADD CONSTRAINT `meudiatarde_ibfk_2` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `meudiatarde_ibfk_3` FOREIGN KEY (`codprofessor`) REFERENCES `professor` (`codigo`);

--
-- Limitadores para a tabela `professorturma`
--
ALTER TABLE `professorturma`
  ADD CONSTRAINT `professorturma_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `professorturma_ibfk_2` FOREIGN KEY (`codprofessor`) REFERENCES `professor` (`codigo`),
  ADD CONSTRAINT `professorturma_ibfk_3` FOREIGN KEY (`codauxiliar`) REFERENCES `auxiliar` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
