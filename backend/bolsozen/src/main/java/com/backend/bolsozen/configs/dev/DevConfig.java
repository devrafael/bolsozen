package com.backend.bolsozen.configs.dev;


import com.backend.bolsozen.enums.CategoryEnum;
import com.backend.bolsozen.enums.MonthEnum;
import com.backend.bolsozen.enums.TypeRegistryEnum;
import com.backend.bolsozen.models.*;
import com.backend.bolsozen.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@Profile("dev")
public class DevConfig {

    @Autowired
    private RegistryRepository registryRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TypeRegistryRepository typeRegistryRepository;

    @Autowired
    private MonthRepository monthRepository;

    @Bean
    public CommandLineRunner devRunner() {
        return args -> {
            System.out.println("Running enviroment development");

            CategoryModel categoryModel1 = new CategoryModel(CategoryEnum.MORADIA.name(), "Pagamentos de contas da casa");
            CategoryModel categoryModel2 = new CategoryModel(CategoryEnum.SAÚDE.name(), "Plano de Saúde e Remédios");
            CategoryModel categoryModel3 = new CategoryModel(CategoryEnum.LAZER.name(), "Cinema, parques, praia, etc");
            CategoryModel categoryModel4 = new CategoryModel(CategoryEnum.SALÁRIO.name(), "Recebimento de Salário");
            CategoryModel categoryModel5 = new CategoryModel(CategoryEnum.FREELAS.name(), "Trabalhos como freelancer");
            CategoryModel categoryModel6 = new CategoryModel(CategoryEnum.OUTROS.name(), "Outras despesas");
            categoryRepository.save(categoryModel1);
            categoryRepository.save(categoryModel2);
            categoryRepository.save(categoryModel3);
            categoryRepository.save(categoryModel4);
            categoryRepository.save(categoryModel5);
            categoryRepository.save(categoryModel6);

            TypeRegistryModel typeRegistryModel = new TypeRegistryModel(TypeRegistryEnum.DESPESA, "despesa");
            TypeRegistryModel typeRegistryModel2 = new TypeRegistryModel(TypeRegistryEnum.RECEITA, "receita");
            typeRegistryRepository.save(typeRegistryModel);
            typeRegistryRepository.save(typeRegistryModel2);

            RegistryModel r1 = new RegistryModel(null,
                    "Revisao Moto",
                    false,
                    LocalDate.now(),
                    5000.0,
                    3,
                    typeRegistryModel2,
                    categoryModel1);
            RegistryModel r2 = new RegistryModel(null,
                    "Salario",
                    false,
                    LocalDate.now().plusMonths(5).plusYears(1),
                    6000.0,
                    1,
                    typeRegistryModel,
                    categoryModel2);
            RegistryModel r3 = new RegistryModel(null,
                    "Quinzena",
                    true,
                    LocalDate.now().plusMonths(5).plusYears(1),
                    1000.0,
                    1,
                    typeRegistryModel2,
                    categoryModel4);
            RegistryModel r4 = new RegistryModel(null,
                    "teste1",
                    true,
                    LocalDate.now().plusMonths(5).plusYears(1),
                    1000.0,
                    1,
                    typeRegistryModel,
                    categoryModel3);
            RegistryModel r5 = new RegistryModel(null,
                    "teste2",
                    true,
                    LocalDate.now().plusMonths(5).plusYears(1),
                    1000.0,
                    1,
                    typeRegistryModel,
                    categoryModel4);
            RegistryModel r6 = new RegistryModel(null,
                    "Mensalidade Academia",
                    true,
                    LocalDate.now().plusMonths(2),
                    200.0,
                    1,
                    typeRegistryModel,
                    categoryModel2);

            RegistryModel r7 = new RegistryModel(null,
                    "Pagamento de Aluguel",
                    true,
                    LocalDate.now().plusMonths(1),
                    1500.0,
                    1,
                    typeRegistryModel,
                    categoryModel1);

            RegistryModel r8 = new RegistryModel(null,
                    "Salário Mensal",
                    true,
                    LocalDate.now().plusMonths(1),
                    5000.0,
                    1,
                    typeRegistryModel2,
                    categoryModel4);

            RegistryModel r9 = new RegistryModel(null,
                    "Cinema e Lazer",
                    true,
                    LocalDate.now().plusWeeks(3),
                    120.0,
                    1,
                    typeRegistryModel,
                    categoryModel3);

            RegistryModel r10 = new RegistryModel(null,
                    "Freelancer Web Design",
                    true,
                    LocalDate.now().plusMonths(1).plusDays(10),
                    800.0,
                    1,
                    typeRegistryModel2,
                    categoryModel5);

            RegistryModel r11 = new RegistryModel(null,
                    "Manutenção do Carro",
                    true,
                    LocalDate.now().plusMonths(4),
                    700.0,
                    1,
                    typeRegistryModel,
                    categoryModel6);

            RegistryModel r12 = new RegistryModel(null,
                    "Plano de Saúde",
                    true,
                    LocalDate.now().plusMonths(3),
                    450.0,
                    1,
                    typeRegistryModel,
                    categoryModel2);
            r1.setInstallment(1);
            r2.setInstallment(1);
            r3.setInstallment(1);
            r4.setInstallment(1);
            r5.setInstallment(1);
            r6.setInstallment(1);
            r7.setInstallment(1);
            r8.setInstallment(1);
            r9.setInstallment(1);
            r10.setInstallment(1);
            r11.setInstallment(1);
            r12.setInstallment(1);

            registryRepository.save(r1);
            registryRepository.save(r2);
            registryRepository.save(r3);
            registryRepository.save(r4);
            registryRepository.save(r5);
            registryRepository.save(r6);
            registryRepository.save(r7);
            registryRepository.save(r8);
            registryRepository.save(r9);
            registryRepository.save(r10);
            registryRepository.save(r11);
            registryRepository.save(r12);

            List<MonthModel> months = List.of(
                    new MonthModel(MonthEnum.JANEIRO, "Janeiro"),
                    new MonthModel(MonthEnum.FEVEREIRO, "Fevereiro"),
                    new MonthModel(MonthEnum.MARCO, "Março"),
                    new MonthModel(MonthEnum.ABRIL, "Abril"),
                    new MonthModel(MonthEnum.MAIO, "Maio"),
                    new MonthModel(MonthEnum.JUNHO, "Junho"),
                    new MonthModel(MonthEnum.JULHO, "Julho"),
                    new MonthModel(MonthEnum.AGOSTO, "Agosto"),
                    new MonthModel(MonthEnum.SETEMBRO, "Setembro"),
                    new MonthModel(MonthEnum.OUTUBRO, "Outubro"),
                    new MonthModel(MonthEnum.NOVEMBRO, "Novembro"),
                    new MonthModel(MonthEnum.DEZEMBRO, "Dezembro")
            );

            monthRepository.saveAll(months);
        };


    }



}