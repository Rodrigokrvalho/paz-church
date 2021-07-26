import React from 'react'
import styles from '../../src/styles/Form.module.css'
import Thanks from '../Thanks/Thanks'

export default class Form extends React.Component {

    state = {
        fullName: '',
        sex: '',
        bornDate: '',
        civil: '',
        childs: '',
        cep: '',
        uf: ' ',
        city: '',
        district: '',
        address: '',
        addressNumber: '',
        addressComp: ' ',
        knowPaz: '',
        participate: '',
        group: '',
        leader: ' ',
        email: '',
        tel: '',
        success: 'wait'
    }

    handleFieldValidation = (values) => {
        let validation = true

        Object.values(values).forEach(value => {
            if (value == '' && validation == true) {
                validation = false
            }
        })
        return validation
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleGetPhone = (event) => {
        const noMaskTel = event.target.value
        let tel = this.maskPhone(noMaskTel)
        this.setState({ tel })
    }

    maskPhone = value => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d{4})(\d)/, "$1 $2");
    }


    handleGetCep = (event) => {
        let cep = event.target.value.replace(/[^0-9]/, '').replace(/[^\d]+/g, '')

        if (cep.length == 8) {
            const url = `https://viacep.com.br/ws/${cep}/json/`
            fetch(url, { mode: 'cors' })
                .then((res) => res.json())
                .then((data) => {
                    this.handleSetAddress(data)
                })
        }

        cep = this.maskCep(cep)
        this.setState({ cep })
    }

    maskCep = (value) => {
        return value.replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    }

    handleSetAddress = (data) => {
        const uf = data.uf
        const city = data.localidade
        const district = data.bairro
        const address = data.logradouro
        this.setState({
            uf,
            city,
            district,
            address
        })
    }

    handleGetDate = (event) => {
        let bornDate = event.target.value
        bornDate = this.maskDate(bornDate)
        this.setState({ bornDate })

    }

    handleDateValidation = (v) => {
        let dateArray = v.split('/')
        if (dateArray[1] <= 12 && dateArray[2] < 2020) {
            let date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0])
            return date == "Invalid Date" ? false : true
        }
        else return false
    }

    maskDate = value => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1");
    }

    handleSend = async (event) => {
        event.preventDefault()
        let valid = true

        if (this.handleDateValidation(this.state.bornDate) == false) {
            valid = false
            alert('Data de nascimento invalida')

        } else if (this.handleFieldValidation(this.state, event.target) == false) {
            valid = false
            alert('Por favor, preencha todos os campos para prosseguir')

        } else if (valid) {
            this.setState({ success: valid })
        }

        valid ? (
            console.log(this.state)
            // try {
            //     const response = await fetch('---LOCAL---', {
            //         method: 'POST',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-type': 'application/json',
            //         },
            //         body: JSON.stringify(this.state)
            //     })
            //     const j = await response.json()

            // } catch (err) {
            //     console.log(err)
            // }
        ) : ''
    }

    render() {
        return (
            <>
                {this.state.success == 'wait' &&
                    <div className={styles.form}>
                        <form onSubmit={this.handleSend}>
                            <section className={styles.section} id="personal">
                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="fullName">Nome Completo</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        value={this.state.fullName}
                                        type="text"
                                        name="fullName"
                                        id="fullName" />
                                </div>

                                <div className={styles.question}>
                                    <p className={styles.description}>Sexo</p>
                                    <select
                                        onChange={this.handleInputChange}
                                        name="sex"
                                        id="sex"
                                        value={this.state.sex}>
                                        <option value=""></option>
                                        <option value="Male">Masculino</option>
                                        <option value="Female">Feminino</option>
                                    </select>
                                </div>

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="bornDate">Data de Nascimento</label>
                                    <input
                                        onChange={this.handleGetDate}
                                        value={this.state.bornDate}
                                        type="text"
                                        name="bornDate"
                                        id="bornDate"
                                        className={styles.date} />
                                </div>

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="civil">Estado Civil</label>
                                    <select
                                        onChange={this.handleInputChange}
                                        value={this.state.civil}
                                        name="civil"
                                        id="civil" >
                                        <option value=""></option>
                                        <option value="single">Solteiro(a)</option>
                                        <option value="married">Casado(a)</option>
                                        <option value="stableUnion">União Estavel</option>
                                        <option value="livingTogether">Morando Juntos</option>
                                        <option value="widower">Viuvo(a)</option>
                                    </select>
                                </div>

                                <div className={styles.question}>
                                    <p className={styles.description}>Possui Filhos menores de idade?</p>
                                    <select
                                        onChange={this.handleInputChange}
                                        name="childs"
                                        id="childYes"
                                        value={this.state.childs} >
                                        <option value=""></option>
                                        <option value="childNo">Não</option>
                                        <option value="child1">1</option>
                                        <option value="child2">2</option>
                                        <option value="child3">3</option>
                                        <option value="child4">4</option>
                                        <option value="child5More">5 ou mais</option>
                                    </select>
                                </div>

                                <div className={styles.buttons}>
                                    <a href="#enterAddress">Proximo</a>
                                </div>
                            </section>

                            <section className={styles.section} id="enterAddress">

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="cep">Cep</label>
                                    <input
                                        name="cep"
                                        value={this.state.cep}
                                        onChange={this.handleGetCep}
                                        type="text"
                                        id="cep" />
                                </div>

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="address">Endereço</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        value={this.state.address}
                                        name="address"
                                        type="text"
                                        id="address" />
                                </div>

                                <div className={styles.horizontal}>
                                    <div className={styles.question}>
                                        <label className={styles.description} htmlFor="addressNumber">Numero</label>
                                        <input
                                            onChange={this.handleInputChange}
                                            value={this.state.addressNumber}
                                            name="addressNumber"
                                            type="number"
                                            id="addressNumber" />
                                    </div>
                                    <div className={styles.question}>
                                        <label className={styles.description} htmlFor="addressComp">Complemento</label>
                                        <input
                                            onChange={this.handleInputChange}
                                            value={this.state.addressComp}
                                            name="addressComp"
                                            type="text"
                                            id="addressComp" />
                                    </div>
                                </div>


                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="district">Bairro</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        value={this.state.district}
                                        name="district"
                                        type="text"
                                        id="district" />
                                </div>

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="city">Cidade</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        value={this.state.city}
                                        name="city"
                                        type="text"
                                        id="city" />
                                </div>

                                <div className={styles.buttons}>
                                    <a href="#personal">Anterior</a>
                                    <a href="#knowUs">Proximo</a>
                                </div>

                            </section>

                            <section className={styles.section} id="knowUs">
                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="knowPaz">Como você conheceu a Paz Church?</label>
                                    <select
                                        onChange={this.handleInputChange}
                                        value={this.state.knowPaz}
                                        type="text"
                                        name="knowPaz"
                                        id="knowPaz" >
                                        <option value=""></option>
                                        <option value="indication">Indicação de um amigo</option>
                                        <option value="youtube">Youtube</option>
                                        <option value="passBy">Passei na frente</option>
                                        <option value="others">Outros</option>
                                    </select>
                                </div>

                                <div className={styles.question}>
                                    <p className={styles.description}>Já participou de algum culto nosso?</p>

                                    <select
                                        onChange={this.handleInputChange}
                                        name="participate"
                                        id="pYes1"
                                        value={this.state.participate} >
                                        <option value=""></option>
                                        <option value="yesOne">Sim, uma vez</option>
                                        <option value="yesSome">Sim, algumas vezes</option>
                                        <option value="no">Não, será a primeira vez</option>
                                    </select>

                                </div>

                                <div className={styles.question}>
                                    <p className={styles.description}>Participa de um Life Group?</p>

                                    <select
                                        onChange={this.handleInputChange}
                                        name="group"
                                        id="group"
                                        value={this.state.group} >
                                        <option value=""></option>
                                        <option value="yes">Sim</option>
                                        <option value="no">Não</option>
                                    </select>

                                </div>

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="leader">Quem é o lider?</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        value={this.state.leader}
                                        type="text"
                                        name="leader"
                                        id="leader" />
                                </div>

                                <div className={styles.buttons}>
                                    <a href="#enterAddress">Anterior</a>
                                    <a href="#contact">Proximo</a>
                                </div>
                            </section>

                            <section className={styles.section} id="contact">
                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="email">Email</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        id="email" />
                                </div>

                                <div className={styles.question}>
                                    <label className={styles.description} htmlFor="whats">Whatsapp</label>
                                    <input
                                        onChange={this.handleGetPhone}
                                        value={this.state.tel}
                                        type="text"
                                        name="tel"
                                        id="tel" />
                                </div>

                                <div className={styles.buttons}>
                                    <a href="#knowUs">Anterior</a>
                                    <button type="submit">Finalizar</button>
                                </div>
                            </section>
                        </form>
                    </div >
                }
                {this.state.success == true &&
                    <section>
                        <Thanks />
                    </section>
                }
            </>
        )
    }
}
