import { ContactDO, ContactPhoneVO } from "@/data/domain_object/crm/contact.do";
import { randEmail, randFirstName, randFullAddress, randLastName, randPhoneNumber, randUrl, randUserName } from "@ngneat/falso";

/*
setSeederFactory(ContactDO, (faker) => {
    const contact = new ContactDO();
    contact.firstName = randFirstName();
    contact.lastName = randLastName();
    contact.address = randFullAddress();
    contact.emails = randEmail({length: 2});
    contact.website = randUrl();
    contact.facebook = randUserName();
    contact.twitter = randUserName();
    contact.whatsapp = randUserName();

    contact.phones = [
        { number: randPhoneNumber(), type: "work" } as ContactPhoneVO,
        { number: randPhoneNumber(), type: "mobile" } as ContactPhoneVO,
    ];

    return contact
});
*/